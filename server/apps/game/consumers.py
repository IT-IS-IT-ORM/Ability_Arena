from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import get_channel_layer

from json import loads as json_loads, dumps as json_dumps

class LiarCardConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.room_group_name = 'liar-card'

        print(self.channel_layer.count_group_channels(self.room_group_name))


        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

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
        message = '运维咖啡吧：' + event['message']

        # Send message to WebSocket
        await self.send(text_data=json_dumps({
            'message': message
        }))
