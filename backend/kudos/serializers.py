from rest_framework import serializers
from kudos.models import Kudos, Profile
from django.contrib.auth import get_user_model
User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = ['pic', 'kudos_budget']

class UserProfileSerializer(serializers.ModelSerializer):
  profile = ProfileSerializer()
  class Meta:
    model = User
    fields = ['username', 'profile']

class KudosSerializer(serializers.ModelSerializer):
  from_user = UserProfileSerializer()
  to_user = UserProfileSerializer()
  class Meta:
    model = Kudos
    fields = ['id', 'from_user', 'to_user', 'message']

class KudosRawSerializer(serializers.ModelSerializer):
  class Meta:
    model = Kudos
    fields = ['id', 'from_user', 'to_user', 'message']
