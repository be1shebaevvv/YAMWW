from django.shortcuts import render

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def menu(request):
    return render(request, 'menu.html')

def stories(request):
    return render(request, 'stories.html')