from django.urls import path

from . import views

urlpatterns = [
    path("", views.event),
    path("/<str:hash_id>", views.event_detail),
]
