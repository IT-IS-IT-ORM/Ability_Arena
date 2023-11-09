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
    password = serializers.CharField(label='密码', max_length=254, trim_whitespace=True, write_only=True, error_messages={
        'blank': 'API_User_passwordlIsRequired',
        'required': 'API_User_passwordIsRequired',
        'max_length': 'API_User_passwordMaxLength',
    })
    email = serializers.CharField(label='电子邮箱', max_length=254, trim_whitespace=True, error_messages={
        'blank': 'API_User_emailIsRequired',
        'required': 'API_User_emailIsRequired',
        'max_length': 'API_User_emailMaxLength',
    })
    avatar_index = serializers.IntegerField(label='头像索引', min_value=0, max_value=99)
    role = serializers.ChoiceField(label='角色', choices=User.ROLE_CHOICES, required=False, source='get_role_display')
    gold = serializers.IntegerField(label='金币', required=False, min_value=0, max_value=100_000)
    create_time = serializers.DateTimeField(label='注册时间', read_only=True)
        

    class Meta:
        model = User
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['username'],
                message='API_User_usernameUnique'
            ),
            serializers.UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email'],
                message='API_User_emailUnique'
            ),
        ]


class LoginSerializer(serializers.Serializer):
    login = serializers.CharField(
        label='Login', max_length=254, trim_whitespace=True, error_messages={
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
        login, password = self.initial_data['login'], self.initial_data['password']
        login_by_email = '@' in login

        try:
            user = User.objects.get(email=login) if login_by_email else User.objects.get(username=login)
        except User.DoesNotExist:
            raise CustomException(message='API_User_wrongLoginOrPassword')

        if not check_password(password, user.password):
            raise CustomException(message='API_User_wrongLoginOrPassword')

        return user
