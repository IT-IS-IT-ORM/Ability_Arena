from django.contrib.auth.hashers import check_password

from rest_framework import serializers
from user.models import User

# from utils.custom_exception import CustomException


class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(label='ID', read_only=True)
    username = serializers.CharField(
        label='用户名', max_length=10, trim_whitespace=True, error_messages={
            'blank': 'Имя пользователя не может быть пустым',
            'required': 'Имя пользователя не может быть пустым',
            'max_length': 'Имя пользователя не может превышать 10 символов',
        })
    password = serializers.CharField(
        label='密码', write_only=True, max_length=10, trim_whitespace=True, error_messages={
            'blank': 'Пароль не может быть пустым',
            'required': 'Пароль не может быть пустым',
            'max_length': 'Пароль не может превышать 10 символа',
        })
    role = serializers.ChoiceField(
        label='角色', choices=User.ROLE_CHOICES, required=False, error_messages={
            'max_length': 'Роль не может превышать 10 символов',
            'invalid_choice': 'Недопустимый роль',
        }, source='get_role_display')
    create_time = serializers.DateTimeField(label='注册时间', read_only=True)

    def validate_username(self, value):
        """用户名的额外校验"""
        allowed_special_characters = '_'

        for char in value:
            if char.isalpha() or char.isnumeric() or char in allowed_special_characters:
                # 是字母 或 是数字 或 在允许的特殊字符内
                pass
            else:
                raise serializers.ValidationError(
                    'Имя пользователя не может содержать специальные символы')

        return super().validate(value)

    class Meta:
        model = User
        fields = '__all__'
        validators = [
            serializers.UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['username'],
                message='Имя пользователя уже существует'
            ),
        ]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(
        label='用户名', max_length=10, trim_whitespace=True, error_messages={
            'blank': 'Имя пользователя не может быть пустым',
            'required': 'Имя пользователя не может быть пустым',
            'max_length': 'Имя пользователя не может превышать 10 символов',
        })
    password = serializers.CharField(
        label='密码', write_only=True, max_length=10, trim_whitespace=True, error_messages={
            'blank': 'Пароль не может быть пустым',
            'required': 'Пароль не может быть пустым',
            'max_length': 'Пароль не может превышать 10 символа',
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