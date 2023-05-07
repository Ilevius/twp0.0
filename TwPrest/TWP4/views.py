from django.shortcuts import render
from rest_framework import generics
from .models import * 
from .serializers import *


class ArticleApiView(generics.ListAPIView): 
    queryset = studentGroup.objects.all()
    serializer_class = ArticleSerializer


class SomeGroup(generics.RetrieveUpdateDestroyAPIView): 
    queryset = studentGroup.objects.all()
    serializer_class = ArticleSerializer

class NewGroup(generics.CreateAPIView): 
    queryset = studentGroup.objects.all()
    serializer_class = ArticleSerializer



class allWorkTemplates(generics.ListAPIView): 
    queryset = workTemplate.objects.all()
    serializer_class = workTemplateSerializer

class someWorkTemplate(generics.RetrieveUpdateDestroyAPIView): 
    queryset = workTemplate.objects.all()
    serializer_class = workTemplateSerializer

class newWorkTemplate(generics.CreateAPIView): 
    queryset = workTemplate.objects.all()
    serializer_class = workTemplateSerializer




class allExercises(generics.ListAPIView): 
    queryset = templateExercise.objects.all()
    serializer_class = templateExerciseSerializer

class someExercise(generics.RetrieveUpdateDestroyAPIView): 
    queryset = templateExercise.objects.all()
    serializer_class = templateExerciseSerializer

class newExercise(generics.CreateAPIView): 
    queryset = templateExercise.objects.all()
    serializer_class = templateExerciseSerializer

    


def workTemplates(request):
    return render(request, 'TWP4/workTemplates.html')    

def students(request):
    return render(request, 'TWP4/students.html')  

def works(request):
    return render(request, 'TWP4/works.html')  