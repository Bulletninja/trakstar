from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator

class Profile(models.Model):
  id = models.AutoField(primary_key=True)
  user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
  pic = models.URLField(max_length=250, null=True)
  kudos_budget = models.PositiveSmallIntegerField(default=3, validators=[MaxValueValidator(3)])

  @property
  def slug(self):
    return self.user.username

  def __str__(self):
    return f'{self.user.username} profile'


class Kudos(models.Model):
  id = models.AutoField(primary_key=True)
  from_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='from_user')
  to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, related_name='to_user')
  message = models.TextField()

  @property
  def profile(self):
    return self.to_user.profile

  def __str__(self):
    return f'kudos from {self.from_user} to {self.to_user}'
