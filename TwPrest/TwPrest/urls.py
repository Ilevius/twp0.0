"""
URL configuration for TwPrest project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from TWP4.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('TWP/', include('TWP4.urls')),
    path('api/v1/studentGroups/', ArticleApiView.as_view()),
    path('api/v1/studentGroups/<int:pk>', SomeGroup.as_view()),
    path('api/v1/studentGroups/new', NewGroup.as_view()),
    path('api/v1/workTemplates/', allWorkTemplates.as_view()),
    path('api/v1/workTemplates/<int:pk>', someWorkTemplate.as_view()),
    path('api/v1/workTemplates/new', newWorkTemplate.as_view()),
    path('api/v1/exercises/', allExercises.as_view())

]
