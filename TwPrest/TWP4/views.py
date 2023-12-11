from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import * 
from .serializers import *
from django.contrib.auth.models import User 
from sympy import *
from sympy.parsing.latex import parse_latex
from rest_framework.permissions import DjangoObjectPermissions, DjangoModelPermissions


class UsersApiView(generics.ListAPIView): 
    queryset = User.objects.all()
    serializer_class = UserSerializer
    #permission_classes = (DjangoObjectPermissions,)

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
    #permission_classes = (DjangoModelPermissions,)

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
            return Response({'error': 'wrong keys'})
        
class WorksApiView(generics.ListAPIView):  
    queryset = Work.objects.all()
    serializer_class = WorksSerializer      

class WorkApiView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Work.objects.all()
    serializer_class = WorkSerializer      

class NewWorkApiView(generics.CreateAPIView):  
    queryset = Work.objects.all()
    serializer_class = WorkPostSerializer   

class TaskApiView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Task.objects.all()
    serializer_class = TaskSerializer      

class TaskPutApiView(generics.RetrieveUpdateDestroyAPIView):  
    queryset = Task.objects.all()
    serializer_class = TaskPutSerializer  


class NewTaskApiView(generics.CreateAPIView):  
    queryset = Work.objects.all()
    serializer_class = TaskPostSerializer  

class TaskByUserWork(APIView):          # sharts when authenticated
    def post(self, request):
        try:
            student_id = request.data['student']
            work_id = request.data['work']
            tasks = Task.objects.filter(student=student_id).filter(work=work_id)
            return Response(tasks.values())
        except:
            return Response({'error': 'wrong keys'})


#{"student":2, "work":27}
#{"template":1, "exercise":2}


class ExpresionVS(APIView):
    def post(self, request):
        try:
            lHand = request.data['lHand']
            rHand = request.data['rHand']

            lHand = parse_latex(r"{}".format(lHand))
            rHand = parse_latex(r"{}".format(rHand))
            result = lHand.equals(rHand)
            return Response({'result': result})
        except:
            return Response({'error': 'wrong keys'})
        
#{"lHand": "\\frac{\\sqrt{2}}{2}", "rHand": "\\frac{1}{\\sqrt{2}}"}

def workTemplates(request):
    return render(request, 'TWP4/workTemplates.html')    

def students(request):
    return render(request, 'TWP4/students.html')  

def works(request):
    return render(request, 'TWP4/works.html')  