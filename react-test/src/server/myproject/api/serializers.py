from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Feed, Datapoint


class DatapointSerializer(serializers.ModelSerializer):

    class Meta:
        model = Datapoint
        fields = ('timestamp', 'value')


class FeedSerializer(serializers.ModelSerializer):
    """Serialisation du model des Flux"""
    links = serializers.SerializerMethodField()

    class Meta:
        model = Feed
        fields = ('id', 'name', 'description',
                  'create_date', 'links')

    def get_links(self, obj):
        request = self.context['request']
        return {
            'self': reverse(
                'feed-detail',
                kwargs={'pk': obj.pk}, request=request),
            'datapoints': reverse(
                'datapoint-list',
                request=request) + '?feed={}'.format(obj.pk),
            'last': reverse(
                'feed-detail',
                kwargs={'pk': obj.pk}, request=request) + 'last',
        }

    def get_last_value(self, obj):
        try:
            if obj.datapoints.count() == 0:
                return None
            else:
                serial = DatapointSerializer(
                    obj.datapoints.latest('timestamp')).data
                return serial  # renvoie de la donnée serialisé via data
        except Exception as err:
            print("error", err)
            return None
