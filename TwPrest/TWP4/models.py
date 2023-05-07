from django.db import models
from django.contrib.auth.models import User

class Article(models.Model): 
    title = models.CharField(max_length=255) 
    content = models.TextField(blank=True) 
    cat = models.ForeignKey('Category', on_delete=models.PROTECT, null=True)

    def __str__(self):
        return self.title
    
class Category(models.Model):
    name = models.CharField(max_length=100, db_index=True)   

    def __str__(self):
        return self.name
    

class studentGroup(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True) 
    students = models.ManyToManyField(User)

    def __str__(self):
        return self.name
    
class templateExercise(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True)
    body = models.TextField(blank=True)  

    def __str__(self):
        return self.name

class workTemplate(models.Model): 
    name = models.CharField(max_length=255) 
    comment = models.TextField(blank=True) 
    templateExercises = models.ManyToManyField(templateExercise)

    def __str__(self):
        return self.name