from django.urls import path

from . import views

urlpatterns = [
    path("", views.webpage, name="webpage"),
    path("/all", views.all, name="all"), # admin url
    path("/default", views.default, name="default"), # admin url
    path("/<str:user_webpage_id>", views.webpage_detail, name="webpage_detail"),
]
