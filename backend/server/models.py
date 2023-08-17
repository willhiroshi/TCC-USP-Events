from django.db import models


class Event(models.Model):
    post_link = models.TextField(null=False)
    date = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=300, null=True)
    price = models.CharField(max_length=50, null=True)
    lat = models.CharField(max_length=25, null=True)
    lng = models.CharField(max_length=25, null=True)
    hash_id = models.TextField(primary_key=True, default='dftValue')
