from django.urls import path

from . import views

urlpatterns = [
    path("", views.webpage, name="webpage"),
    path("/all-webpages", views.all_webpages, name="all_webpages"), # admin url
    path("/<str:user_webpage_id>", views.webpage_detail, name="webpage_detail"),
]
