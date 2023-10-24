import hashlib

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response

from .models import Event, WebPage
from .serializers import EventSerializer


@api_view(["GET", "POST", "DELETE"])
def event(request):
    START_DATE_PARAM = "start_date"
    END_DATE_PARAM = "end_date"
    TYPES_PARAM = "types"
    LOCATIONLESS_PARAM = "locationless"

    if request.method == "GET":
        queryParams = request.query_params

        webpages = WebPage.objects.filter(is_default=True)

        if request.user.is_authenticated:
            webpages = webpages | WebPage.objects.filter(users=request.user)

        events = Event.objects.filter(webpage__in=webpages)

        if START_DATE_PARAM in queryParams and END_DATE_PARAM in queryParams:
            start = queryParams[START_DATE_PARAM]
            end = queryParams[END_DATE_PARAM]

            events = events.filter(date__gte=start, date__lte=end)

        if TYPES_PARAM in queryParams:
            requested_types = queryParams[TYPES_PARAM].split(",")

            invalid_types = [
                type
                for type in requested_types
                if type not in dict(Event.EVENT_TYPES).keys()
            ]
            if invalid_types:
                return Response(
                    {"error": f"Invalid event type(s): {', '.join(invalid_types)}"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            events = events.filter(type__in=requested_types)

        if LOCATIONLESS_PARAM in queryParams:
            latLngToFilter = eval(queryParams[LOCATIONLESS_PARAM])
            events = events.filter(
                lat__isnull=latLngToFilter, lng__isnull=latLngToFilter
            )

        serializer = EventSerializer(events, many=True)

        return Response({"data": serializer.data})

    # POST method to create a new event for admin users
    elif request.method == "POST":
        if request.user.is_superuser is False:
            return Response(
                {"error": "You do not have permission to create events."},
                status=status.HTTP_403_FORBIDDEN,
            )

        # create a hash id for the post
        hash_object = hashlib.sha256()
        post_link: str = request.data["post_link"]
        hash_object.update(post_link.encode())
        hash_hex = hash_object.hexdigest()
        dataToSerialize = request.data
        dataToSerialize["hash_id"] = hash_hex

        serializer = EventSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer.save()
        return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAdminUser])
def event_detail(request, hash_id):
    try:
        event = Event.objects.get(pk=hash_id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = EventSerializer(event)
        return Response({"data": serializer.data})

    elif request.method == "PUT":
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data})
        return Response(
            {"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
