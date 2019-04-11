from django.contrib import admin
from django.contrib.auth.models import Group
from .models import User, Recipe, Follow, Favorite


class UserAdmin(admin.ModelAdmin):

    fieldsets = ((None, {"fields": ("username", "email", "country")}),)

    list_display = ("username", "email", "country", "date_joined", "last_login")


admin.site.unregister(Group)
admin.site.register(User, UserAdmin)
admin.site.register(Recipe)
admin.site.register(Follow)
admin.site.register(Favorite)
