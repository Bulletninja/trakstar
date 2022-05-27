from django.contrib import admin
from kudos import models
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin

class ProfileInline(admin.StackedInline):
  model = models.Profile

class UserAdmin(AuthUserAdmin):
  inlines = [ProfileInline]

@admin.register(models.Kudos)
class KudosAdmin(admin.ModelAdmin):
  pass

@admin.register(models.Profile)
class ProfileAdmin(admin.ModelAdmin):
  pass

admin.site.unregister(get_user_model())
admin.site.register(get_user_model(), UserAdmin)
