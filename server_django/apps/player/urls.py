from django.urls import path
from rest_framework import routers
from django.conf import settings

from player.views import PlayerViewSet, LoginAPIView

if settings.DEBUG:
    router = routers.DefaultRouter()
else:
    router = routers.SimpleRouter()

router.register(r'player', PlayerViewSet)

urlpatterns = router.urls

urlpatterns += [
    # 登录接口
    path('auth/login/', LoginAPIView.as_view()),
]

app_name = 'player'
