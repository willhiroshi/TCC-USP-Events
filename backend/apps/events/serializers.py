from rest_framework import serializers

from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            "hash_id",
            "post_link",
            "address",
            "date",
            "price",
            "lat",
            "lng",
            "type",
            "source",
            "webpage",
        ]
