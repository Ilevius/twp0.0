from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import * 
from .serializers import *
from django.contrib.auth.models import User 



class UsersApiView(generics.ListAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserApiView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer



class GroupsApiView(generics.ListAPIView): 
    queryset = Group.objects.all()
    serializer_class = GroupsSerializer

class GroupApiView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class NewGroupApiView(generics.CreateAPIView): 
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


#                                                           Here we work with Templates 
class TemplatesApiView(generics.ListAPIView): 
    queryset = Template.objects.all()
    serializer_class = TemplateListSerializer

class TemplateApiView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

class NewTemplateApiView(generics.CreateAPIView): 
    queryset = Template.objects.all()
    serializer_class = TemplatePostSerializer




class ExercisesApiView(generics.ListAPIView): 
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class ExerciseApiView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class NewExerciseApiView(generics.CreateAPIView): 
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializer

class setTemplExer(APIView):
    def post(self, request):
        try:
            template_id = request.data['template']
            exercise_id = request.data['exercise']
            exercise = Exercise.objects.get(pk=exercise_id)
            template = Template.objects.get(pk=template_id)
            template.exercises.add(exercise)
            return Response({'chosen templ': template.name, 'chosen exer': exercise.name})
        except:
            return Response({'error': 'whrong keys'})
        
class WorksApiView(generics.ListAPIView):  
    queryset = Work.objects.all()
    serializer_class = WorksSerializer      

class WorkApiView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Work.objects.all()
    serializer_class = WorkSerializer      

class TaskApiView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Task.objects.all()
    serializer_class = TaskSerializer       


#{"template":1, "exercise":2}

def workTemplates(request):
    return render(request, 'TWP4/workTemplates.html')    

def students(request):
    return render(request, 'TWP4/students.html')  

def works(request):
    return render(request, 'TWP4/works.html')  