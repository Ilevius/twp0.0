from django.urls import path


from .views import * 

urlpatterns = [
    path('', workTemplates),
    path('students/', students),
    path('works/', works)
]