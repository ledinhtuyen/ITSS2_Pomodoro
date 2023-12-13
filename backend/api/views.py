from django.http import HttpResponse # new
from rest_framework import viewsets
from .models import Timer
from .serializers import TimerSerializer
from rest_framework.response import Response

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
