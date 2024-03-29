from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    path("/register", views.register, name="register"),
    path("/delete", views.delete_user, name="delete_user"),
    path("/token", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("/token/invalidate", views.logout, name="token_invalidate"),
]
