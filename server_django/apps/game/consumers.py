from channels.generic.websocket import JsonWebsocketConsumer

from player.models import Player
from player.serializers import PlayerSerializer
from game.models import Room, RoomMember
from game.serializers import RoomSerializer, RoomMemberSerializer

from utils.jwt import check_jwt

from asgiref.sync import async_to_sync
from datetime import datetime
from uuid import uuid4


'''
WS message 模板

{
    message_id: id,
    message_type: 'chat.xxx', 'game.xxx', 'action.xxx',
    message_time: date time string,
    data: {} | []
}
'''


class GameConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'game-{self.room_id}'

        print('建立WS链接')
        self.accept()

        self.token = self.scope.get(
            "query_string", b"token=").decode("utf-8").split('=')[-1]
        is_valid, result = check_jwt(self.token)
        self.user = result if is_valid else None

        if self.user is None:
            self.chat_message({'message': '请先登录!'})
            self.close()
            return

        # TODO: 如何掉线重连?

        try:
            self.room = Room.objects.get(id=int(self.room_id))
        except Room.DoesNotExist:
            self.chat_message({'message': '房间不存在!'})
            self.close()
            return

        print('加入房间')
        self.room.add_member(self.room, self.user)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        print('通知所有人，有人加入房间')
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "group.send",
                "message_id": str(uuid4()),
                "message_type": "chat.info.player_join",
                "message_time": str(datetime.now()),
                "data": PlayerSerializer(instance=self.user).data
            }
        )

    def disconnect(self, close_code):
        print('退出房间')
        self.room.discard_member(self.room, self.user)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "group.send",
                "message_id": str(uuid4()),
                "message_type": "chat.info.player_leave",
                "message_time": str(datetime.now()),
                "data": PlayerSerializer(instance=self.user).data
            }
        )
        print('断开WS链接')

    def receive_json(self, content: dict):
        print('receive_json: ', content)

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                **{
                    "type": "group.send",
                    "message_id": str(uuid4())
                },
                **content,
                **{
                    "data": {
                        'content': content['data'],
                        'sender': PlayerSerializer(instance=self.user).data
                    }
                }
            }
        )

    def group_send(self, message):
        self.send_json(message)
