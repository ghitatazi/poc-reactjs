# -*- coding: UTF-8 -*-
import json

from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import viewsets, filters
from rest_framework.response import Response
from rest_framework.decorators import detail_route

from .forms import DatapointFilter
from .models import Feed, Datapoint
from .serializers import FeedSerializer, DatapointSerializer


class DefaultsMixin(object):
    """Default settings for view authentication, permissions,
    filtering and pagination."""

    paginate_by = 25
    paginate_by_param = 'page_size'
    max_paginate_by = 100
    filter_backends = (
        filters.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )


class FeedViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """API endpoint for listing and creating sprints."""

    queryset = Feed.objects.order_by('create_date')
    serializer_class = FeedSerializer
    search_fields = ('name', )
    ordering_fields = ('create_date', 'name', )

    @detail_route(methods=['get'])
    def last(self, request, pk=None):
        print("REQUEST :", request)
        queryset = Feed.objects.all()
        feed = get_object_or_404(queryset, pk=pk)
        if feed.datapoints.count() != 0:
            lastPoint = feed.datapoints.latest('timestamp')
            serializer = DatapointSerializer(lastPoint)
            return Response(serializer.data)
        else:
            return Response({'error': "No last data"})


class DatapointViewSet(DefaultsMixin, viewsets.ModelViewSet):
    """API endpoint for listing and creating sprints."""

    queryset = Datapoint.objects.all()
    serializer_class = DatapointSerializer
    filter_class = DatapointFilter
    ordering_fields = ('timestamp', )


def bytView(request):
    """Récupération d'une requête http externe."""
    print('REQUEST : ', request)
    print('GET : ', request.GET)
    print('BODY : ', request.body)
    if request.GET["ty"] == "20020":
        print('uplinks')
        # Commande uplinks de objenious
        body = json.loads(request.body.decode("utf-8"))
        feed = Feed.objects.get(pk=2)  # Récupération du flux en base
        print('feed :', feed.name)
        # création d'un nouveau datapoint avec les données de la requête
        datapoint = Datapoint(
            feed=feed, timestamp=body["UplinkIndication"]["GTW-Timestamp"],
            value=body["UplinkIndication"]["CapturedObjects"])
        print('datapoint : (%s, %s)' % (datapoint.timestamp, datapoint.value))
        # sauvegarde en base de donnée
        datapoint.save()
    elif request.GET["ty"] == "20023":
        print("joinAccept request")
    return HttpResponse(
        json.dumps({"status": "ok"}),
        content_type="application/json")

