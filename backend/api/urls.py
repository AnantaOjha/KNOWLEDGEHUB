from django.urls import path
from .views import ask_ai,health_check

urlpatterns = [
    path("ask/", ask_ai, name="ask_ai"),
     path("health/", health_check, name="health_check"), 
]
