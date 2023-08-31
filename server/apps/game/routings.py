from django.urls import path
from apps.game.consumers import GameConsumer

websocket_urlpatterns = [
    path('ws/game/<int:room_id>/', GameConsumer.as_asgi())
]