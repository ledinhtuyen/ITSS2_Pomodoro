from django.contrib import admin
from .models import Post, Video, Category, User, Timer, LikePost, LikeVideo

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)
    list_filter = ('name',)
    list_per_page = 5

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'category')

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ('title', 'category')
    list_filter = ('category',)
    search_fields = ('title', 'category')

@admin.register(Timer)
class TimerAdmin(admin.ModelAdmin):
    list_display = ('user', 'pomodoro', 'short_break', 'long_break', 'sleep_time')

@admin.register(LikePost)
class LikePostAdmin(admin.ModelAdmin):
    list_display = ('user', 'post')

@admin.register(LikeVideo)
class LikeVideoAdmin(admin.ModelAdmin):
    list_display = ('user', 'video')
