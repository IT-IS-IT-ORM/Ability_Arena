from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from user.models import User

from utils.custom_exception import CustomException


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    username = serializers.CharField(
        label='用户名', max_length=10, trim_whitespace=True, error_messages={
            'blank': 'API_User_usernameIsRequired',
            'required': 'API_User_usernameIsRequired',
            'max_length': 'API_User_usernameMaxLength',
        })
    avatar_index = serializers.IntegerField(label='头像索引', min_value=0, max_value=99)
    role = serializers.ChoiceField(
        label='角色', choices=User.ROLE_CHOICES, required=False, source='get_role_display')
    create_time = serializers.DateTimeField(label='注册时间', read_only=True)

    def can_register(self):
        """校验 用户名是否被占用, 返回 User模型对象"""
        username = self.initial_data['username']

        user = User.objects.filter(username=username).first()
        if user:
            raise CustomException(message='API_User_usernameUnique')

        return User.objects.create(**self.initial_data)

    class Meta:
        model = User
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['username'],
                message='API_User_usernameUnique'
            ),
        ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        label='用户名', max_length=10, trim_whitespace=True, error_messages={
            'blank': 'API_User_usernameIsRequired',
            'required': 'API_User_usernameIsRequired',
            'max_length': 'API_User_usernameMaxLength',
        })
    password = serializers.CharField(
        label='密码', write_only=True, max_length=254, trim_whitespace=True, error_messages={
            'blank': 'Пароль не может быть пустым',
            'required': 'Пароль не может быть пустым',
            'max_length': 'Пароль не может превышать 254 символа',
        })

    def is_correct(self):
        """校验 登录数据 正确性, 返回 User模型对象"""
        username, password = self.initial_data['username'], self.initial_data['password']

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise CustomException(
                message='Неверное имя пользователя или пароль')

        if not check_password(password, user.password):
            raise CustomException(
                message='Неверное имя пользователя или пароль')

        return user
