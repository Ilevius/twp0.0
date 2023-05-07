from rest_framework import serializers
from .models import *


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = studentGroup
        fields = ('id', 'name', 'comment')

class templateExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = templateExercise
        fields = ('id', 'name', 'body', 'comment')


class workTemplateSerializer(serializers.ModelSerializer):
    templateExercises = templateExerciseSerializer(many=True)
    class Meta:
        model = workTemplate
        fields = ('id', 'name', 'comment', 'templateExercises')