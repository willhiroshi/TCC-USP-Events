from django.db import models


class Event(models.Model):
    post_link = models.CharField(max_length=300)
