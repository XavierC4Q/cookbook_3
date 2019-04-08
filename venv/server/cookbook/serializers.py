from rest_framework import serializers
from .models import User, Recipe, Follow, Favorite


class UserSerializer(serializers.ModelSerializer):
    
    total_followers = serializers.SerializerMethodField(read_only=True)
    total_favorites = serializers.SerializerMethodField(read_only=True)
    total_recipes = serializers.SerializerMethodField(read_only=True)

    def get_total_followers(self, obj):
        return Follow.objects.filter(follows__id=obj.id).count()

    def get_total_favorites(self, obj):
        return Favorite.objects.filter(favorited_by=obj.id).count()

    def get_total_recipes(self, obj):
        return Recipe.objects.filter(owner=obj.id).count()

    class Meta:

        model = User
        fields = (
            "username",
            "date_joined",
            "email",
            "country",
            "last_login",
            "id",
            "total_favorites",
            "total_recipes",
            "total_followers",
            "profile_image",
        )
        ordering = ["-id"]


class RecipeSerializer(serializers.ModelSerializer):

    favorite_count = serializers.SerializerMethodField(read_only=True)
    owner = UserSerializer()

    def get_favorite_count(self, obj):
        return Favorite.objects.filter(recipe=obj.id).count()

    class Meta:

        model = Recipe
        fields = "__all__"
        depth = 1


class FollowSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    follows = UserSerializer()

    class Meta:

        model = Follow
        fields = "__all__"
        ordering = ["followed_on"]
        depth = 1



class FavoriteSerializer(serializers.ModelSerializer):

    favorited_by = UserSerializer()
    recipe = RecipeSerializer()

    class Meta:

        model = Favorite
        fields = "__all__"
        ordering = ["favorited_on"]
        depth = 1
