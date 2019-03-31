from rest_framework import serializers
from .models import User, Recipe, Follow

class UserSerializer (serializers.ModelSerializer):

    class Meta:
        
        model = User
        fields = ('username', 'date_joined', 'email', 'country', 'last_login', 'id')
        ordering = ['-id']

class RecipeSerializer (serializers.ModelSerializer):

    class Meta:

        model = Recipe
        fields = '__all__'


class FollowSerializer (serializers.ModelSerializer):

    class Meta:

        model = Follow
        fields = '__all__'
        ordering = ['followed_on']