from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin", admin.site.urls),
    path("events", include("apps.events.urls")),
    path("auth", include("apps.authentication.urls")),
    path("webpage", include("apps.webpage.urls")),
]
