"""
URL configuration for newproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.urls import path,re_path
from newapp import views
urlpatterns = [
    path('admin/', admin.site.urls),
    path('reg',views.register),
    path('log',views.login_page),
    # re_path(r'^tasks$', views.taskapi), 
    
    # # Route for operations on specific tasks, e.g., update or delete
    # re_path(r'^tasks/([0-9]+)$', views.taskapi),  
    path('tasks', views.taskapi),          # For listing and creating tasks
    path('tasks/<int:id>', views.taskapi),



]
