import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True, blank=False)
    username = models.CharField(
        max_length=100, unique=True, blank=False, default="default_username"
    )
    password = models.CharField(max_length=100, blank=False)
    name = models.CharField(max_length=100, blank=False)

    # no additional fields required for user creation via manage.py
    REQUIRED_FIELDS = []
