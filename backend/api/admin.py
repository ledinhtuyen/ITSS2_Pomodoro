from django.contrib import admin
from .models import Post, Video, Category

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
