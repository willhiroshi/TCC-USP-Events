import hashlib

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer


@api_view(["GET", "POST", "DELETE"])
def event(request):
    print("salveeeeeeeeeeeee")
    if request.method == "GET":
        queryParams = request.query_params

        if 'start_date' in queryParams and 'end_date' in queryParams:
            start = queryParams['start_date']
            end = queryParams['end_date']

            events = Event.objects.filter(date__gte=start, date__lte=end)
        else:
            events = Event.objects.all()
        serializer = EventSerializer(events, many=True)

        return Response({"data": serializer.data})

    elif request.method == "POST":
        hash_object = hashlib.sha256()
        post_link:str = request.data['post_link']
        hash_object.update(post_link.encode())
        hash_hex = hash_object.hexdigest()
        dataToSerialize = request.data
        dataToSerialize['hash_id'] = hash_hex
        serializer = EventSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)
        else:
            return Response({"data": "Error to save Post", "Post": dataToSerialize}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "DELETE"])
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
