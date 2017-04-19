import django_filters
from .models import Datapoint


class DatapointFilter(django_filters.FilterSet):

    ts_min = django_filters.NumberFilter(name='timestamp', lookup_type='gte')
    ts_max = django_filters.NumberFilter(name='timestamp', lookup_type='lte')

    class Meta:
        model = Datapoint
        fields = ('feed', 'ts_min', 'ts_max')
