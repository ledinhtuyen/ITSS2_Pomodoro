from django.http import HttpResponse # new
from rest_framework import viewsets
from .models import Timer, Post, Video, Category, LikePost, LikeVideo
from .serializers import TimerSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db.models import Count

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
def recommend(request):
    data = {
            "posts": [],
            "videos": []
            }
    
    # Get post, video of user_id = 1 liked
    liked_posts = LikePost.objects.filter(user_id=1)
    liked_videos = LikeVideo.objects.filter(user_id=1)

    for liked_post in liked_posts:
        if (len(data["videos"]) + len(data["posts"])) < 8:
            count = len(LikePost.objects.filter(post_id=liked_post.post_id).annotate(total=Count('post_id')))
            data["posts"].append({
                "id": liked_post.post.id,
                "title": liked_post.post.title,
                "thumbnail": liked_post.post.thumbnail,
                "likes": count
            })

    # Add to data
    for liked_video in liked_videos:
        if (len(data["videos"]) + len(data["posts"])) < 8:
            count = len(LikeVideo.objects.filter(video_id=liked_video.video_id).annotate(total=Count('video_id')))
            data["videos"].append({
                "id": liked_video.video.id,
                "title": liked_video.video.title,
                "thumbnail": liked_video.video.thumbnail,
                "likes": count
            })

    # Get post, video has most liked
    most_liked_posts = LikePost.objects.values('post_id').annotate(total=Count('post_id')).order_by('-total')
    most_liked_videos = LikeVideo.objects.values('video_id').annotate(total=Count('video_id')).order_by('-total')

    for most_liked_post in most_liked_posts:
        if (len(data["videos"]) + len(data["posts"])) < 8:
            post = Post.objects.get(id=most_liked_post['post_id'])
            if post.id not in [pos['id'] for pos in data["posts"]]:
                count = len(LikePost.objects.filter(post_id=post.id).annotate(total=Count('post_id')))
                data["posts"].append({
                    "id": post.id,
                    "title": post.title,
                    "thumbnail": post.thumbnail,
                    "likes": count
                })

    for most_liked_video in most_liked_videos:
        if (len(data["videos"]) + len(data["posts"])) < 8:
            video = Video.objects.get(id=most_liked_video['video_id'])
            if video.id not in [vid['id'] for vid in data["videos"]]:
                count = len(LikeVideo.objects.filter(video_id=video.id).annotate(total=Count('video_id')))
                data["videos"].append({
                    "id": video.id,
                    "title": video.title,
                    "thumbnail": video.thumbnail,
                    "likes": count
                })
    
    return Response(data)

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

@api_view(['GET'])
def detail(request):
    data = {}

    if request.GET['type'] == "post":
        result = Post.objects.get(id=request.GET['id'])
    elif request.GET['type'] == "video":
        result = Video.objects.get(id=request.GET['id'])
        data["link"] = result.link
    else:
        return Response({"status": 400, "message": "エラー" }, status=400, content_type='application/json')
    
    data["id"] = result.id
    data["title"] = result.title
    data["thumbnail"] = result.thumbnail
    data["category"] = result.category.name
    data["content"] = result.content

    return Response(data)

@api_view(['POST'])
def like(request):
    if request.data['type'] == "post":
        # Check if user liked this post
        if LikePost.objects.filter(user_id=1, post_id=request.data['id']).exists():
            # Delete like
            LikePost.objects.filter(user_id=1, post_id=request.data['id']).delete()
        else:
            # Create like
            LikePost.objects.create(user_id=1, post_id=request.data['id'])

    elif request.data['type'] == "video":
        # Check if user liked this video
        if LikeVideo.objects.filter(user_id=1, video_id=request.data['id']).exists():
            # Delete like
            LikeVideo.objects.filter(user_id=1, video_id=request.data['id']).delete()
        else:
            # Create like
            LikeVideo.objects.create(user_id=1, video_id=request.data['id'])
    else:
        return Response({"status": 400, "message": "エラー" }, status=400, content_type='application/json')

    return Response({"status": 200, "message": "成功" }, status=200, content_type='application/json')
