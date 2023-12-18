from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('timer', views.TimerViewSet.as_view({
        'get': 'retrieve',
        'post': 'update',
    }), name='timer'),
    path('recommend', views.recommend, name='recommend'),
    path('list_post_video', views.list_post_video, name='list_post_video'),
    path('list_category', views.list_category, name='list_category'),
    path('search_by_category', views.search_by_category, name='search_by_category'),
    path('search_by_title', views.search_by_title, name='search_by_title'),
    path('detail', views.detail, name='detail'),
    path('like', views.like, name='like')
]
