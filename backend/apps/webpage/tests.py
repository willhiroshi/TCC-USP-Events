from unittest.mock import Mock
import uuid

from apps.authentication.models import User
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.test import APIClient, APITestCase

from .models import WebPage
from .serializers import WebPageSerializer, WebPageWithoutUsers


class WebPageSerializerTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="12345",
            name="Test User",
        )
        self.webpage = WebPage.objects.create(
            link="http://example.com", source="facebook"
        )
        self.webpage.users.add(self.user)
        self.request = Mock(user=self.user)
        self.serializer = WebPageSerializer(instance=self.webpage)

    def test_validate_correct_data(self):
        serializer = WebPageSerializer(
            data={"link": "http://correct.com", "source": "facebook"},
            context={"request": self.request},
        )
        self.assertTrue(serializer.is_valid())

    def test_validate_unique_link_source_user(self):
        serializer = WebPageSerializer(
            data={"link": "http://example.com", "source": "facebook"},
            context={"request": self.request},
        )
        with self.assertRaises(ValidationError):
            serializer.is_valid(raise_exception=True)

    def test_validate_invalid_link(self):
        serializer = WebPageSerializer(
            data={"link": "invalid_url", "source": "facebook"},
            context={"request": self.request},
        )
        with self.assertRaises(ValidationError):
            serializer.is_valid(raise_exception=True)


class WebPageViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="12345",
            name="Test User",
        )
        self.client.force_authenticate(user=self.user)
        self.webpage = WebPage.objects.create(
            link="http://example.com", source="facebook"
        )
        self.webpage.users.add(self.user)

    def test_get_user_webpages(self):
        response = self.client.get(reverse("webpage"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data = WebPageWithoutUsers(self.webpage).data
        returned_data = response.data["data"][0]
        self.assertEqual(returned_data, expected_data)

    def test_post_user_webpage(self):
        body = {"link": "http://newexample.com", "source": "facebook"}
        response = self.client.post(reverse("webpage"), body)
        returned_data = response.data["data"]
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(returned_data["link"], body["link"])
        self.assertEqual(returned_data["source"], body["source"])

    def test_post_user_webpage_duplicate(self):
        body = {"link": "http://example.com", "source": "facebook"}
        response = self.client.post(reverse("webpage"), body)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class WebPageDetailViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            email="test@example.com",
            username="testuser",
            password="12345",
            name="Test User",
        )
        self.client.force_authenticate(user=self.user)
        self.webpage = WebPage.objects.create(
            link="http://example.com", source="facebook"
        )
        self.webpage.users.add(self.user)

    def test_delete_user_webpage(self):
        response = self.client.delete(
            reverse("webpage_detail", kwargs={"user_webpage_id": self.webpage.id})
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(WebPage.objects.filter(id=self.webpage.id).exists())

    def test_delete_inexistent_user_webpage(self):
        response = self.client.delete(
            reverse("webpage_detail", kwargs={"user_webpage_id": uuid.uuid4()})
        )
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_put_user_webpage(self):
        data = {"link": "http://newexample.com", "source": "instagram"}
        response = self.client.put(
            reverse("webpage_detail", kwargs={"user_webpage_id": self.webpage.id}), data
        )
        new_webpage = WebPage.objects.filter(link=data["link"],source=data["source"])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(WebPage.objects.filter(id=self.webpage.id).exists())
        self.assertTrue(new_webpage.exists())


class AllWebPagesViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(
            email="admin@example.com",
            username="adminuser",
            password="12345",
            name="Admin User",
        )
        self.client.force_authenticate(user=self.admin_user)
        self.normal_user1 = User.objects.create_user(
            email="user1@example.com",
            username="user1",
            password="12345",
            name="User 1",
        )
        self.normal_user2 = User.objects.create_user(
            email="user2@example.com",
            username="user2",
            password="12345",
            name="User 2",
        )
        self.webpage1 = WebPage.objects.create(
            link="http://example1.com", source="facebook"
        )
        self.webpage2 = WebPage.objects.create(
            link="http://example2.com", source="facebook"
        )
        self.webpage1.users.add(self.normal_user1)
        self.webpage2.users.add(self.normal_user2)

    def test_normal_user_cannot_access_all_webpages(self):
        self.client.force_authenticate(user=self.normal_user1)
        response = self.client.get(reverse("all"))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_all_webpages(self):
        response = self.client.get(reverse("all"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        expected_data1 = WebPageSerializer(self.webpage1).data
        expected_data2 = WebPageSerializer(self.webpage2).data
        returned_data = response.data["data"]
        self.assertIn(expected_data1, returned_data)
        self.assertIn(expected_data2, returned_data)
