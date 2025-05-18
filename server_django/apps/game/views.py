from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import authentication_classes

from game.serializers import RoomSerializer, RoomMemberSerializer
from game.models import Room, RoomMember

from utils.authentication import LoginRequiredAuthentication


class RoomViewSet(ModelViewSet):
    """
    房间 API 类
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    def get_authenticators(self):
        if self.request.method not in ('GET'):
            return [LoginRequiredAuthentication()]
