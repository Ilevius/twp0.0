from django.contrib.auth import logout
from django.http import HttpResponse
from django.shortcuts import redirect, render
from django.contrib.auth.views import LoginView
from django.contrib.auth.forms import AuthenticationForm
from django.urls import reverse_lazy

def home(request):
    return render(request, 'TWP4/start.html')  

def logout_user(request):
    logout(request)
    return redirect('home')  

def userPage(request):
    return HttpResponse("Здесь будет страничка пользователя")

class loginUser(LoginView):
    form_class = AuthenticationForm
    template_name = 'TWP4/login.html'

    def get_success_url(self):
        return reverse_lazy('home')

