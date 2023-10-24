from django.db import models

from apps.webpage.models import WebPage


class Event(models.Model):
    EVENT_TYPES = [
        ("unclassified", "Unclassified"),
        ("culture", "Culture"),
        ("sport", "Sport"),
    ]

    hash_id = models.TextField(primary_key=True, default="dftValue")
    post_link = models.TextField(null=False)
    date = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=300, null=True)
    price = models.CharField(max_length=50, null=True)
    lat = models.CharField(max_length=25, null=True)
    lng = models.CharField(max_length=25, null=True)
    type = models.CharField(max_length=40, choices=EVENT_TYPES, default="unclassified")
    source = models.CharField(max_length=20, null=True)
    webpage = models.ForeignKey(WebPage, on_delete=models.CASCADE, related_name='events')
