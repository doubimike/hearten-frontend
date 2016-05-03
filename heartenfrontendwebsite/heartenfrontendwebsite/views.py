from django.shortcuts import render
from django.http import HttpResponse
from django.http import Http404
from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.core.context_processors import csrf
from django.shortcuts import redirect
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import authenticate,login

# Create your views here.
def index(request):
	if request.method =='POST':
		form = UserCreationForm(request.POST)
		if form.is_valid():
			new_user = form.save()
			return redirect('/')
	else:
		form = UserCreationForm()
	return render(request,'heartenfrontendwebsite/home.html',{'form':form})

def logout(request):
	auth_logout(request)
	return redirect('/')

def login_view(request):
	username = request.POST['username']
	password = request.POST['password']
	user = authenticate(username=username,password=password)
	if user is not None:
		login(request,user)
		return redirect('/')
	else:
		return redirect('/')	