from django.urls import path
from rest_framework import routers
from django.conf import settings

from game.views import RoomViewSet

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'room', RoomViewSet)

urlpatterns = router.urls

app_name = 'game'
