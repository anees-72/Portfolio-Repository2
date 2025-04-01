from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import CASCADE


# Create your models here.
class User(AbstractUser):
    pass

class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    photo = models.URLField(max_length=250,blank=True)
    linkedin = models.URLField(max_length=200, blank=True)
    summary = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    languages=models.CharField(max_length=300,blank=True,default=" ")
    location=models.CharField(max_length=250,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name}'s Resume"


class Education(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=100, blank=True)
    institution = models.CharField(max_length=100, blank=True)
    years = models.CharField(max_length=20, blank=True)
    gpa = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f"{self.degree} - {self.institution}"


class Experience(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='experiences')
    job_title = models.CharField(max_length=100, blank=True)
    company = models.CharField(max_length=100, blank=True)
    years = models.CharField(max_length=20, blank=True)
    tech_stack = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.job_title} at {self.company}"


class Certification(models.Model):
    resume = models.ForeignKey(Resume, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    tech_used = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return self.name
