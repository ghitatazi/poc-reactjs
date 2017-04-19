from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'feeds', views.FeedViewSet)
router.register(r'datapoints', views.DatapointViewSet)
