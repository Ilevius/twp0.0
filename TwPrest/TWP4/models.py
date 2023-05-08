from django.db import models
from django.contrib.auth.models import User   

class Group(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True) 
    students = models.ManyToManyField(User)

    def __str__(self):
        return self.name
    
class Exercise(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True)
    body = models.TextField(blank=True)  

    def __str__(self):
        return self.name

class Template(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True) 
    exercises = models.ManyToManyField(Exercise, blank=True)

    def __str__(self):
        return self.name