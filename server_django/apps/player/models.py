from django.db import models
from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth.hashers import make_password


class Player(models.Model):
    '''Player model'''

    nickname = models.CharField(max_length=10, unique=True, verbose_name='昵称')
    password = models.CharField(max_length=254, verbose_name='密码')
    email = models.CharField(max_length=254, unique=True, verbose_name='电子邮箱')
    # 头像储存于前端, 通过索引分配
    avatar_index = models.CharField(max_length=2, verbose_name='头像索引')
    # 匹配制分数 Matchmaking rating
    mmr = models.PositiveIntegerField(default=0, verbose_name='MMR')
    create_time = models.DateTimeField(auto_now_add=True, verbose_name='注册时间')

    class Meta:
        db_table = 'player'
        verbose_name = '玩家'
        verbose_name_plural = '玩家'

    def __str__(self):
        return f'[{self.mmr}] {self.nickname}'

    @property
    def is_authenticated(self):
        """
        Always return True. This is a way to tell if the player has been
        authenticated in templates.
        """
        return True


@receiver(pre_save, sender=Player)
def player_pre_save(sender, instance, **kwargs):
    '''保存前将密码加密'''
    # pbkdf2_sha256$
    if not instance.password.startswith('pbkdf2_sha256$'):
        instance.password = make_password(instance.password)
