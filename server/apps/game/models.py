# from django.db import models


# class Game(models.Model):
#     '''Game model'''

#     name = models.CharField(max_length=24, unique=True, verbose_name='游戏名')

#     create_time = models.DateTimeField(auto_now_add=True, verbose_name='创建时间')

#     class Meta:
#         db_table = 'game'
#         verbose_name = '游戏'
#         verbose_name_plural = '游戏'

#     def __str__(self):
#         return f'{self.name}'

