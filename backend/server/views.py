from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Event
from .serializers import EventSerializer


@api_view(["GET", "POST", "DELETE"])
def event(request):
    if request.method == "GET":
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return(Response(serializer.data))

    elif request.method == "POST":
        serializer = EventSerializer(data=request.data)
        print("entrei no post")

        if serializer.is_valid():
            serializer.save()
            print(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def event_detail(request, id):

    try:
        event = Event.objects.get(pk=id)
    except Event.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        print("salve")
        serializer = EventSerializer(event)
        return(Response(serializer.data))

    elif request.method == 'PUT':
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)