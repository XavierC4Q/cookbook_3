from django.contrib import admin

from .models import User, Recipe, Follow

class UserAdmin (admin.ModelAdmin):

    fieldsets = (
        (None, {
            'fields': (
                'username',
                'email',
                'country'
            ),
        }),
    )

    list_display = ('username', 'email', 'country', 'date_joined', 'last_login')
    

admin.site.register(User, UserAdmin)
admin.site.register(Recipe)
admin.site.register(Follow)
