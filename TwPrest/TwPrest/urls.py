from django.contrib import admin
from django.urls import path, include
from TWP4.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('TWP/', include('TWP4.urls')),
    path('api/v1/groups/', GroupsApiView.as_view()),
    path('api/v1/group/<int:pk>', GroupApiView.as_view()),
    path('api/v1/group/new', NewGroupApiView.as_view()),
    path('api/v1/templates/', TemplatesApiView.as_view()),
    path('api/v1/template/<int:pk>', TemplateApiView.as_view()),
    path('api/v1/template/new', NewTemplateApiView.as_view()),
    path('api/v1/exercises/', ExercisesApiView.as_view()),
    path('api/v1/exercise/<int:pk>', ExerciseApiView.as_view()),
    path('api/v1/exercise/new', NewExerciseApiView.as_view()),
    path('api/v1/settemplexer', setTemplExer.as_view()),
    path('api/v1/users', UsersApiView.as_view()),
    path('api/v1/works', WorksApiView.as_view()),
    path('api/v1/work/<int:pk>', WorkApiView.as_view()),
    path('api/v1/task/<int:pk>', TaskApiView.as_view()),
    path('api/v1/work/new', NewWorkApiView.as_view()),
    path('api/v1/task/new', NewTaskApiView.as_view()),
    path('api/v1/taskbystudentandwork', TaskByUserWork.as_view()),
]
