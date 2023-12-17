from django.http import HttpResponse # new
from rest_framework import viewsets
from .models import Timer, Post, Video, Category
from .serializers import TimerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view

def index(request):
    return HttpResponse("Hello.")

class TimerViewSet(viewsets.ModelViewSet):
    queryset = Timer.objects.all()
    serializer_class = TimerSerializer

    def retrieve(self, request, *args, **kwargs):
        # Get object has user_id = 1
        instance = Timer.objects.get(user_id=request.GET['user'])
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def update(self, request, *args, **kwargs):
        # Get object has user_id = 1
        instance = Timer.objects.get(user_id=request.data['user'])
        serializer = self.get_serializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": 200, "message": "成功", "data": serializer.data}, status=200, content_type='application/json')
        return Response({"status": 400, "message": "エラー", "data": serializer.data}, status=400, content_type='application/json')

@api_view(['GET'])
def list_post_video(request):
    data = {
            "posts": [],
            "videos": []
            }
    # Get all post
    posts = Post.objects.all()
    videos = Video.objects.all()

    for post in posts:
        data["posts"].append({
            "id": post.id,
            "title": post.title,
            "thumbnail": post.thumbnail,
            "description": post.description,
        })
    
    for video in videos:
        data["videos"].append({
            "id": video.id,
            "title": video.title,
            "thumbnail": video.thumbnail,
            "description": video.description,
        })

    return Response(data)

@api_view(['GET'])
def list_category(request):
    data = {
            "categories": []
           }
    categories = Category.objects.all()

    for category in categories:
        data["categories"].append({
            "id": category.id,
            "name": category.name,
        })

    return Response(data)

@api_view(['GET'])
def search_by_category(request):
    data = {
            "posts": [],
            "videos": []
            }
    # Get all post
    posts = Post.objects.filter(category__name__icontains=request.GET['name'])
    videos = Video.objects.filter(category__name__icontains=request.GET['name'])

    for post in posts:
        data["posts"].append({
            "id": post.id,
            "title": post.title,
            "thumbnail": post.thumbnail,
            "description": post.description,
        })
    
    for video in videos:
        data["videos"].append({
            "id": video.id,
            "title": video.title,
            "thumbnail": video.thumbnail,
            "description": video.description,
        })

    return Response(data)

@api_view(['GET'])
def search_by_title(request):
    data = {
            "posts": [],
            "videos": []
            }
    # Get all post
    posts = Post.objects.filter(title__icontains=request.GET['title'])
    videos = Video.objects.filter(title__icontains=request.GET['title'])

    for post in posts:
        data["posts"].append({
            "id": post.id,
            "title": post.title,
            "thumbnail": post.thumbnail,
            "description": post.description,
        })
    
    for video in videos:
        data["videos"].append({
            "id": video.id,
            "title": video.title,
            "thumbnail": video.thumbnail,
            "description": video.description,
        })

    return Response(data)
