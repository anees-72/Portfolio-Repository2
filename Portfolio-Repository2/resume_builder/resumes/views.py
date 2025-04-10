from django.shortcuts import render, HttpResponseRedirect, redirect
from django.http import HttpResponse, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from resumes.models import User, Resume, Education, Experience, Certification
from django.conf import settings
import markdown
from openai import OpenAI
from django_ratelimit.decorators import ratelimit
from google.oauth2.service_account import Credentials
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from io import BytesIO
import uuid



def index(request):
    return render(request, "resumes/index.html")

@csrf_exempt
@login_required
@ratelimit(key='user', rate='10/m', block=True)
def suggest(request):
    if request.method == "POST":
        key = settings.API_KEY
        data = json.loads(request.body)
        field_id = data.get('field')
        current = data.get('current', '')
        print(current)
        client = OpenAI(
            base_url="https://api.aimlapi.com/v1",
            api_key=key,
        )
        prompts = {
            'summary': f"Professional summary for resume from {current}, 60-80 words,efficient.",
            'job_desc-': f"Job desc. for resume from {current}, 60-80 words,efficient.",
            'project_desc-': f"Project desc. for resume from {current}, 60-80 words,efficeint."
        }
        suggestion = "AI suggestions for your resume based on your current input"

        for key, prompt in prompts.items():
            if field_id.startswith(key):
                response = client.chat.completions.create(
                    model="gpt-4o mini",
                    messages=[
                       {"role": "system", "content": "You are a supportive AI resume assistant."},
                       {"role": "user", "content": prompt}
                    ],
                    max_tokens=100,
                )
                suggestion = response.choices[0].message.content.strip()
                break
        return JsonResponse({'suggestion': suggestion})
    return JsonResponse({'error': 'invalid_method'}, status=400)



def upload_to_drive(file, filename):
    creds = Credentials.from_service_account_info(json.loads(settings.GOOGLE_DRIVE_KEY))
    drive_service = build('drive', 'v3', credentials=creds)
    folder_id = settings.FOLDER_ID  
    file_metadata = {'name': filename, 'parents': [folder_id]}
    file_content = file.read()  
    media = MediaIoBaseUpload(BytesIO(file_content), mimetype=file.content_type)
    uploaded_file = drive_service.files().create(body=file_metadata, media_body=media, fields='id').execute()
    drive_service.permissions().create(fileId=uploaded_file.get('id'), body={'role': 'reader', 'type': 'anyone'}).execute()
    return f"https://drive.google.com/thumbnail?id={uploaded_file.get('id')}"

@login_required
def create(request):
    if request.method == "POST":
        try:
            resume = Resume.objects.filter(user=request.user).latest('created_at')
        except Resume.DoesNotExist:
            resume = Resume.objects.create(user=request.user)

        
        resume.name = request.POST.get("name")
        resume.email = request.POST.get("email")
        resume.phone = request.POST.get("phone")
        resume.location = request.POST.get("location")
        resume.languages = request.POST.get("languages")
        resume.linkedin = request.POST.get("linkedin", "")
        resume.summary = markdown.markdown(request.POST.get("summary", ""))
        resume.skills = request.POST.get("skills", "")
        resume.save()

        
        upload_id = str(uuid.uuid4()) if request.FILES.get("photo") else None
        try:
            if upload_id:
                photo_file = request.FILES.get("photo")
                waitUntil(lambda: resume.__setattr__('photo', upload_to_drive(photo_file, photo_file.name)) or resume.save())
        except Exception as e:
            return JsonResponse({"Error":str(e)},status=500)

        
        resume.educations.all().delete()
        resume.experiences.all().delete()
        resume.projects.all().delete()

        for degree, institution, years, gpa in zip(
            request.POST.getlist("degree[]"), request.POST.getlist("institution[]"),
            request.POST.getlist("years[]"), request.POST.getlist("gpa[]")
        ):
            if degree or institution:
                Education.objects.create(resume=resume, degree=degree, institution=institution, years=years, gpa=gpa)

        for job_title, company, years, tech_stack, desc in zip(
            request.POST.getlist("job_title[]"), request.POST.getlist("company[]"),
            request.POST.getlist("exp_years[]"), request.POST.getlist("tech_stack[]"),
            request.POST.getlist("job_desc[]")
        ):
            if job_title or company:
                html_desc = markdown.markdown(desc)
                Experience.objects.create(resume=resume, job_title=job_title, company=company,
                                        years=years, tech_stack=tech_stack, description=html_desc)

        for name, desc, tech in zip(
            request.POST.getlist("project_name[]"), request.POST.getlist("project_desc[]"),
            request.POST.getlist("project_tech[]")
        ):
            if name:
                html_desc = markdown.markdown(desc)
                Certification.objects.create(resume=resume, name=name, description=html_desc, tech_used=tech)

        return JsonResponse({"message": "Resume created", "upload_id": upload_id, "resume_id": resume.id}, status=202)
            

    if request.GET.get('edit') == 'true':
        try:
            resume = Resume.objects.filter(user=request.user).latest('created_at')
            context = {
                "resume": resume,
                "educations": list(resume.educations.all()),
                "experiences": list(resume.experiences.all()),
                "projects": list(resume.projects.all())
            }
            return render(request, "resumes/create.html", context)
        except Resume.DoesNotExist:
            pass

    return render(request, "resumes/create.html")

@login_required
def check_upload(request,upload_id,resume_id):
    resume=Resume.objects.get(id=resume_id,user=request.user)
    return JsonResponse({"url":resume.photo if resume.photo else ""})

@login_required
def templates(request):
    template_list = [
        (1, "Modern Tech", "Sleek, minimalist design for tech pros"),
        (2, "Creative Coder", "Bold layout with a creative edge"),
        (3, "Classic Pro", "Timeless, professional look"),
        (4, "Tech Grid", "Structured grid format for clarity"),
    ]
    return render(request, "resumes/templates.html", {"templates": template_list})

@login_required
def preview(request, template_id):
    try:
        resume = Resume.objects.filter(user=request.user).latest('created_at')
        resume.skills_list = [skill.strip() for skill in resume.skills.split(",")] if resume.skills else []
        resume.languages_list = [lang.strip() for lang in resume.languages.split(",")] if resume.languages else []
        educations = resume.educations.all()
        experiences = resume.experiences.all()
        projects = resume.projects.all()
        template_map = {
            1: "resumes/template1.html",
            2: "resumes/template2.html",
            3: "resumes/template3.html",
            4: "resumes/template4.html",
        }
        template = template_map.get(int(template_id), "resumes/template1.html")    
        return render(request, "resumes/preview.html", {
            "resume": resume,
            "educations": educations,
            "experiences": experiences,
            "projects": projects,
            "template": template,
            "template_id": template_id
        })
    except Resume.DoesNotExist:
        templates_list = [
            (1, "Modern Tech", "Sleek, minimalist design for tech pros"),
            (2, "Creative Coder", "Bold layout with a creative edge"),
            (3, "Classic Pro", "Timeless, professional look"),
            (4, "Tech Grid", "Structured grid format for clarity"),
        ]
        return render(request, "resumes/templates.html", {
            "templates": templates_list,
            "error": "No resume found. Please create one first to show your data on this resume template."
        })

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "resumes/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "resumes/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "resumes/register.html", {
                "message": "Passwords must match."
            })
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "resumes/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "resumes/register.html")
