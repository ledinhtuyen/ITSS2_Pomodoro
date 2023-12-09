from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('timer/', views.TimerViewSet.as_view({
        'get': 'retrieve',
        'post': 'update',
    }), name='timer'),
]
