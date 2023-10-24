import uuid
from apps.authentication.models import User
from django.db import models


class WebPage(models.Model):
    SOURCES = [
        ("facebook", "Facebook"),
        ("instagram", "Instagram"),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    link = models.URLField(unique=True)
    source = models.CharField(max_length=50, choices=SOURCES)
    users = models.ManyToManyField(User, related_name="webpages")
    is_default = models.BooleanField(default=False)
