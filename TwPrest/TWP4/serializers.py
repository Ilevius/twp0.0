from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User  




class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name')

class GroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'comment')

class GroupSerializer(serializers.ModelSerializer):
    students = UserSerializer(many=True, read_only=True)
    class Meta:
        model = Group
        fields = ('id', 'name', 'comment', 'students')


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ('id', 'name', 'body', 'comment')


class TemplateSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)
    class Meta:
        model = Template
        fields = ('id', 'name', 'comment', 'exercises')


class TemplateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'name', 'comment')


class TemplatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ('id', 'name', 'comment')


class WorksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = ('id', 'name', 'comment')    


class WorkSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    template = TemplateSerializer(read_only=True)
    class Meta:
        model = Work
        fields = ('id', 'name', 'comment', 'startdate', 'finishdate', 'group', 'template')  


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('__all__')
