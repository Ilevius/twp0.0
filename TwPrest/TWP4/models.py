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
    

class Work(models.Model):
    name = models.CharField(max_length=255)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    template = models.ForeignKey(Template, on_delete=models.CASCADE)   
    comment = models.TextField(blank=True) 
    startdate = models.DateTimeField(blank=True)
    finishdate = models.DateTimeField(blank=True)

    def __str__(self):
        return self.name


class Task(models.Model): 
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    ask = models.TextField()
    solution = models.TextField(blank=True)
    rightanswer = models.TextField()   
    answer = models.TextField(blank=True)  
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    answerdate = models.DateTimeField(blank=True) 

    def __str__(self):
        return self.ask
    