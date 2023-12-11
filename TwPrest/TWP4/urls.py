from django.urls import path


from .views import * 

urlpatterns = [
    path('', workTemplates, name = 'templates'),
    path('students/', students, name = 'journals'),
    path('works/', works, name = 'works')
]