from django.contrib import admin
from django.views.static import serve
from django.conf import settings
from django.urls import path, re_path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # 用户 API
    # path('api/', include('user.urls')),
    # 游戏 API
    path('api/', include('game.urls')),

    re_path(r'^media/(?P<path>.*)$', serve,
            {"document_root": settings.MEDIA_ROOT}),
]
