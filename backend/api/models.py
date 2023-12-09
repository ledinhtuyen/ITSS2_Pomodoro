from django.db import models
from django.contrib.auth.models import User

class Timer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pomodoro = models.IntegerField(default=25)
    short_break = models.IntegerField(default=5)
    long_break = models.IntegerField(default=30)
    # 23:00
    sleep_time = models.TimeField(default='23:00')

    def __str__(self):
        return "Timer for " + self.user.first_name + " " + self.user.last_name
    
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
class Video(models.Model):
    title = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    content = models.TextField()

    def __str__(self):
        return self.title
    
class LikePost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

class LikeVideo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    video = models.ForeignKey(Video, on_delete=models.CASCADE)
