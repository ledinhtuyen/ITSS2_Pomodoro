from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('timer', views.TimerViewSet.as_view({
        'get': 'retrieve',
        'post': 'update',
    }), name='timer'),
    path('get_all', views.PostVideoList.as_view(), name='get_all_video_post')
]
