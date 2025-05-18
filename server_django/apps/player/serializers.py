from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from player.models import Player

from utils.custom_exception import CustomException


class PlayerSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    nickname = serializers.CharField(
        label='昵称', max_length=10, trim_whitespace=True, error_messages={
            'blank': 'API_Player_nicknameIsRequired',
            'required': 'API_Player_nicknameIsRequired',
            'max_length': 'API_Player_nicknameMaxLength',
        })
    password = serializers.CharField(label='密码', max_length=254, trim_whitespace=True, write_only=True, error_messages={
        'blank': 'API_Player_passwordlIsRequired',
        'required': 'API_Player_passwordIsRequired',
        'max_length': 'API_Player_passwordMaxLength',
    })
    email = serializers.CharField(label='电子邮箱', max_length=254, trim_whitespace=True, error_messages={
        'blank': 'API_Player_emailIsRequired',
        'required': 'API_Player_emailIsRequired',
        'max_length': 'API_Player_emailMaxLength',
    })
    avatar_index = serializers.IntegerField(
        label='头像索引', min_value=0, max_value=99)
    mmr = serializers.IntegerField(label='MMR', read_only=True)
    create_time = serializers.DateTimeField(label='注册时间', read_only=True)

    class Meta:
        model = Player
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=Player.objects.all(),
                fields=['nickname'],
                message='API_Player_nicknameUnique'
            ),
            serializers.UniqueTogetherValidator(
                queryset=Player.objects.all(),
                fields=['email'],
                message='API_Player_emailUnique'
            ),
        ]


class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(
        label='Login', max_length=254, trim_whitespace=True, error_messages={
            'blank': 'API_Player_nicknameIsRequired',
            'required': 'API_Player_nicknameIsRequired',
            'max_length': 'API_Player_nicknameMaxLength',
        })
    password = serializers.CharField(
        label='密码', write_only=True, max_length=254, trim_whitespace=True, error_messages={
            'blank': 'Пароль не может быть пустым',
            'required': 'Пароль не может быть пустым',
            'max_length': 'Пароль не может превышать 254 символа',
        })

    def is_correct(self):
        """校验 登录数据 正确性, 返回 Player模型对象"""
        login, password = self.initial_data['login'], self.initial_data['password']
        login_by_email = '@' in login

        try:
            player = Player.objects.get(
                email=login
            ) if login_by_email else Player.objects.get(nickname=login)
        except Player.DoesNotExist:
            raise CustomException(message='API_Player_wrongLoginOrPassword')

        if not check_password(password, player.password):
            raise CustomException(message='API_Player_wrongLoginOrPassword')

        return player
