from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "username", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    # override create method to hash password
    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    def validate_username(self, value):
        if User.objects.filter(email=value).exists() or value == self.initial_data.get(
            "email"
        ):
            raise serializers.ValidationError(
                "Username cannot be the same as an email."
            )
        return value
