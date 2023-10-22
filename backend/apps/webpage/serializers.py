from apps.authentication.serializers import UserSerializer
from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from rest_framework import serializers

from .models import WebPage


class WebPageSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True, read_only=True)

    class Meta:
        model = WebPage
        fields = ["id", "link", "source", "users", "is_default"]

    def validate(self, data):
        link = data.get("link")
        source = data.get("source")
        user = self.context["request"].user

        if WebPage.objects.filter(link=link, source=source, users=user).exists():
            raise serializers.ValidationError(
                "A webpage with the same link, source and user already exists."
            )

        return data

    def validate_link(self, value):
        validator = URLValidator()

        try:
            validator(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid URL!")
        return value


class WebPageWithoutUsers(serializers.ModelSerializer):
    class Meta:
        model = WebPage
        fields = ["id", "link", "source"]
