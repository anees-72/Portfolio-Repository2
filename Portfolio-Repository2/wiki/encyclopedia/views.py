from django.shortcuts import render, redirect
from django.http import HttpResponse
import markdown
from .models import Entry
import random

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": Entry.objects.values_list('title', flat=True)
    })

def entry(request, name):
    try:
        entry = Entry.objects.get(title__iexact=name)
        entry_content = markdown.markdown(entry.content)
        return render(request, "encyclopedia/entry.html", {
            "name": name,
            "content": entry_content
        })
    except Entry.DoesNotExist:
        return render(request, "encyclopedia/error.html", {
            "message": f"Entry with the name of '{name.capitalize()}' not found"
        })

def search(request):
    q = request.GET.get('q', '')
    try:
        entry = Entry.objects.get(title__iexact=q)
        return redirect('entry', name=q)
    except Entry.DoesNotExist:
        entries = Entry.objects.filter(title__icontains=q).values_list('title', flat=True)
        return render(request, "encyclopedia/search.html", {
            "name": q,
            "content": entries
        })

def create(request):
    if request.method == "GET":
        return render(request, "encyclopedia/create.html")
    else:
        title = request.POST.get('title').strip()
        content = request.POST.get('content')
        if not title or not content:
            return render(request, "encyclopedia/error.html", {"message": "Title or content missing"})
        if Entry.objects.filter(title__iexact=title).exists():
            return render(request, "encyclopedia/error.html", {"message": "File name already exists"})
        Entry.objects.create(title=title, content=content)
        dcontent = markdown.markdown(content)
        return render(request, "encyclopedia/entry.html", {"name": title, "content": dcontent})

def edit(request):
    if request.method == "POST":
        title = request.POST.get('title')
        entry = Entry.objects.get(title__iexact=title)
        return render(request, "encyclopedia/edit.html", {"title": title, "content": entry.content})

def save_edit(request):
    if request.method == "POST":
        title = request.POST.get('title').strip()
        content = request.POST.get('content')
        entry = Entry.objects.get(title__iexact=title)
        entry.content = content
        entry.save()
        dcontent = markdown.markdown(content)
        return render(request, "encyclopedia/entry.html", {"name": title, "content": dcontent})

def random_entry(request):
    entry = random.choice(Entry.objects.all())
    content = markdown.markdown(entry.content)
    return render(request, "encyclopedia/entry.html", {
        "name": entry.title,
        "content": content
    })