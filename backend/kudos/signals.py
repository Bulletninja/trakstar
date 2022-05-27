from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings
from rest_framework.authtoken.models import Token

from kudos.models import Profile


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_related_stuff(sender, instance, created, *args, **kwargs):
    # Notice that we're checking for `created` here. We only want to do this
    # the first time the `User` instance is created. If the save that caused
    # this signal to be run was an update action, we know the user already
    # has a profile.
    if instance and created:#default pic?
        instance.profile = Profile.objects.create(user=instance, kudos_budget=3)
        token = Token.objects.create(user=instance)
