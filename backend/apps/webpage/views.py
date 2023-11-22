from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response

from .models import WebPage
from .serializers import WebPageSerializer, WebPageWithoutUsers


@api_view(["GET"])
@permission_classes([IsAdminUser])
def all(request):
    if request.method == "GET":
        webpages = WebPage.objects.all()
        serializer = WebPageSerializer(webpages, many=True)
        return Response({"data": serializer.data})

@api_view(["POST"])
@permission_classes([IsAdminUser])
def default(request):
    if request.method == "POST":

        webpage, created = WebPage.objects.get_or_create(
            link=request.data["link"],
            source=request.data["source"]
        )

        webpage.is_default = True

        webpage.save()

        serializer = WebPageWithoutUsers(webpage)
        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def webpage(request):
    if request.method == "GET":
        webpages = WebPage.objects.filter(users=request.user)
        serializer = WebPageWithoutUsers(webpages, many=True)
        return Response({"data": serializer.data})

    elif request.method == "POST":
        serializer = WebPageSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)

        webpage, created = WebPage.objects.get_or_create(
            link=serializer.validated_data["link"],
            source=serializer.validated_data["source"],
        )

        webpage.users.add(request.user)
        webpage.save()

        serializer = WebPageWithoutUsers(webpage)

        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)


@api_view(["DELETE", "PUT"])
@permission_classes([IsAuthenticated])
def webpage_detail(request, user_webpage_id):
    try:
        webpage = WebPage.objects.get(id=user_webpage_id, users=request.user)
    except WebPage.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "DELETE":
        serializer = WebPageWithoutUsers(webpage)
        deleted_webpage = serializer.data

        users_count_with_webpage = webpage.users.count()

        if users_count_with_webpage > 1:
            webpage_user_to_delete = webpage.users.all().get(name=request.user)
            webpage.users.remove(webpage_user_to_delete)

        else:
            webpage.delete()

        return Response({"data": deleted_webpage}, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = WebPageSerializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        users_count_with_webpage = webpage.users.count()

        webpage_to_update, created = WebPage.objects.get_or_create(
            link=serializer.validated_data["link"],
            source=serializer.validated_data["source"],
        )

        webpage_to_update.users.add(request.user)

        if users_count_with_webpage == 1:
            webpage.delete()

        else:
            webpage_user_to_update = webpage.users.all().get(name=request.user)
            webpage.users.remove(webpage_user_to_update)


        serializer = WebPageWithoutUsers(webpage)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
