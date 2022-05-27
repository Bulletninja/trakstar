from django.shortcuts import render
# from django import views
from kudos.serializers import KudosSerializer, ProfileSerializer, UserProfileSerializer
from rest_framework import viewsets, views
from kudos.models import Kudos, Profile as ProfileModel
from django.http import HttpResponse
import json
from django.contrib.auth import get_user_model
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()

# Create your views here.
class Me(viewsets.ModelViewSet):
  """returns logged users' profile"""
  # serializer_class = ProfileSerializer
  # queryset = ProfileModel.objects.all()
  serializer_class = UserProfileSerializer
  queryset = User.objects.all()


  def get_queryset(self):
    if self.action == 'list':
      print(f"request.user:{self.request.user}")
      return self.queryset.filter(id=self.request.user.id)
    return self.queryset

class UserProfile(viewsets.ModelViewSet):
  """Returns the profile of a given username"""
  serializer_class = UserProfileSerializer
  queryset = User.objects.all()
  lookup_field = 'username'

  # def list(self, request):
  #   # user = User.objects.get(username=request.user)
  #   print(f"USER: {dir(request.user)}")
  #   return HttpResponse(json.dumps({
  #     'username': request.user.username, 'profile_pic': user.profile.pic
  #   }))



# class Profiles(views.APIView):
#   """Different ways of listing profiles"""
#   pass

class KudosView(viewsets.ModelViewSet):
  """Different ways of manipulating/displaying Kudos"""
  serializer_class = KudosSerializer
  queryset = Kudos.objects.all()

  def create(self, request):
    message = request.data.get('message')
    to_username = request.data.get('to_username')
    to_user = User.objects.get(username=to_username)
    from_user = request.user
    kudo = Kudos.objects.create(**{'from_user': from_user, 'to_user': to_user, 'message': message})
    print(f"kudo!!: {kudo}")
    return Response(data={'message': 'ok'}, status=status.HTTP_201_CREATED)



class CustomAuthToken(ObtainAuthToken):
  def post(self, request, *args, **kwargs):
    print("in post")
    serializer = self.serializer_class(data=request.data,
                                        context={'request': request})
    print(serializer)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data['user']
    token, created = Token.objects.get_or_create(user=user)
    return Response({
        'token': token.key,
        'username': user.username,
    })
