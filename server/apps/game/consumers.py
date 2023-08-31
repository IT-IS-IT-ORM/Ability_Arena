from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import get_channel_layer

from utils.jwt import check_jwt

from json import loads as json_loads, dumps as json_dumps


class GameConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = f'game-{self.room_id}'

        print('建立WS链接')
        await self.accept()

        # set user (`None` or `instance`)
        # self.token = self.scope.get(
        #     "query_string", b"token=").decode("utf-8").split('=')[-1]
        # is_valid, result = check_jwt(self.token)
        # self.user = result if is_valid else None

        # if self.user is None:
        #     await self.chat_message({'message': '你需要登录'})
        #     await self.close()
        #     return
        
        # # Join room group
        # print('加入房间')
        # await self.channel_layer.group_add(
        #     self.room_group_name,
        #     self.channel_name
        # )
        # await self.channel_layer.group_send(
        #     self.room_group_name,
        #     {
        #         "type": "chat.message",
        #         "room_id": self.room_id,
        #         # "username": self.scope["user"].username,
        #         "username": 'Test user',
        #         "message": 'a new person join',
        #     }
        # )

    async def disconnect(self, close_code):
        print('退出房间')
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print('断开WS链接')

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json_loads(text_data)
        message = text_data_json['message']

        print('self.groups: ', self.room_group_name)

        print('ring size: ', self.channel_layer.ring_size)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = '疯狂三国杀：' + event['message']

        # Send message to WebSocket
        await self.send_json({
            'message': message
        })
