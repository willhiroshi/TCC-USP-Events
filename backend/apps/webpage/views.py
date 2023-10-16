from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import WebPage
from .serializers import WebPageSerializer, WebPageWithoutUsers


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

        webpage = WebPage.objects.create(
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

        webpage.delete()

        return Response({"data": deleted_webpage}, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serializer = WebPageSerializer(
            webpage, data=request.data, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        serializer = WebPageWithoutUsers(webpage)
        return Response({"data": serializer.data}, status=status.HTTP_200_OK)
