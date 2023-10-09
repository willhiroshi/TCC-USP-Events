from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import UserSerializer


class UserSerializerTestCase(TestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword",
            "name": "Test User",
        }

    def test_user_serializer_with_valid_data(self):
        serializer = UserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

    def test_user_serializer_with_invalid_data_with_username_same_as_email(self):
        test_data = self.user_data.copy()
        test_data["username"] = test_data["email"]
        serializer = UserSerializer(data=test_data)
        self.assertFalse(serializer.is_valid())
        self.assertEqual(set(serializer.errors.keys()), set(["username"]))


class RegisterViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse("register")
        self.user_data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "testpassword",
            "name": "Test User",
        }

    def test_register_user_with_valid_data(self):
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email=self.user_data["email"]).exists())

    def test_register_user_with_invalid_data_with_username_same_as_email(self):
        self.user_data["username"] = "test@example.com"  # username same as email
        response = self.client.post(self.register_url, self.user_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class LogoutViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com", password="test_password", username="test_user"
        )
        self.refresh = str(RefreshToken.for_user(self.user))

    def test_logout_with_valid_refresh_token(self):
        response = self.client.post(reverse("token_invalidate"), {"refresh": str(self.refresh)})
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)

    def test_logout_with_invalid_refresh_token(self):
        response = self.client.post(reverse("token_invalidate"), {"refresh": "invalid_token"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
