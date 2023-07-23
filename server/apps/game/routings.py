from django.urls import path
from apps.game.consumers import LiarCardConsumer

websocket_urlpatterns = [
    path('ws/game/liar-card/', LiarCardConsumer.as_asgi())
]