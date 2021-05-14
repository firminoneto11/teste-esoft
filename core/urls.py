from django.urls import path
from core.views import index, cadastro

urlpatterns = [
    path('', index, name='home'),
    path('cadastro/', cadastro, name='cadastro')
]
