from django.urls import path

from . import views

urlpatterns = [
    path("", views.webpage, name="webpage"),
    path("/<str:user_webpage_id>", views.webpage_detail, name="webpagedetail"),
]
