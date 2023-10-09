from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True, blank=False)
    name = models.CharField(max_length=100, blank=False)
    username = None
    password = models.CharField(max_length=100, blank=False)

    # use email to log in instead of username
    USERNAME_FIELD = "email"

    # no additional fields required for user creation
    REQUIRED_FIELDS = []
