from rest_framework import serializers
from user.models import User
from game.models import Room, RoomMember

from utils.custom_exception import CustomException


class RoomSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    name = serializers.CharField(label='房间名称', max_length=20)
    homeowner = serializers.PrimaryKeyRelatedField(
        label='房主', queryset=User.objects.all())
    password = serializers.CharField(label='房间密码', required=False, max_length=8, write_only=True)
    max_member_count = serializers.IntegerField(label='最大人数', min_value=2, max_value=10)

    class Meta:
        model = Room
        fields = '__all__'

    def add_member(self, room_json):
        members = RoomMember.objects.filter(room=room_json['id'])
        # TODO: 这里直接返回User
        room_json['member'] = RoomMemberSerializer(
            instance=members, many=True).data

        return room_json

    def to_representation(self, instance):
        return self.add_member(super().to_representation(instance))


class RoomMemberSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    room = serializers.PrimaryKeyRelatedField(
        label='房间', queryset=Room.objects.all(), write_only=True)
    member = serializers.PrimaryKeyRelatedField(
        label='成员', queryset=User.objects.all())

    class Meta:
        model = RoomMember
        fields = '__all__'
        