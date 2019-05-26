from rest_framework import serializers
from .models import User, Recipe, Follow, Favorite
from allauth.account import app_settings as allauth_settings
from allauth.utils import (email_address_exists, get_username_max_length)
from .adapter import CustomAdapter
from allauth.account.utils import setup_user_email


class RegisterSerializer(serializers.Serializer):

    username = serializers.CharField(max_length=get_username_max_length(),
                                     min_length=6,
                                     required=True)
    email = serializers.EmailField(required=False)
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    country = serializers.CharField(max_length=30)

    def validate_username(self, username):
        username = CustomAdapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = CustomAdapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    ("A user is already registered with this e-mail address."))
        return email

    def validate_password1(self, password):
        return CustomAdapter().clean_password(password)

    def validate_country(self, country):
        return CustomAdapter().clean_country(country)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(
                ("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
            'country': self.validated_data.get('country', '')
        }

    def save(self, request):
        adapter = CustomAdapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        return user


class UserSerializer(serializers.ModelSerializer):

    total_followers = serializers.SerializerMethodField(read_only=True)
    total_favorites = serializers.SerializerMethodField(read_only=True)
    total_recipes = serializers.SerializerMethodField(read_only=True)

    @staticmethod
    def get_total_followers(self):
        if Follow.objects.filter(user__id=self.id):
            return Follow.objects.filter(user__id=self.id).get().follows.count()
        else:
            return 0

    @staticmethod
    def get_total_favorites(self):
        if Favorite.objects.filter(favorited_by=self.id):
            return Favorite.objects.filter(favorited_by=self.id).get().recipe.count()
        else:
            return 0

    @staticmethod
    def get_total_recipes(self):
        return Recipe.objects.filter(owner=self.id).count()

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
    owner = UserSerializer(read_only=True)

    @staticmethod
    def get_favorite_count(self):
        if Favorite.objects.filter(recipe=self.id):
            return Favorite.objects.filter(recipe=self.id).count()
        else:
            return 0

    class Meta:

        model = Recipe
        fields = "__all__"
        depth = 1


class FollowSerializer(serializers.ModelSerializer):

    user = UserSerializer()
    follows = UserSerializer(many=True)

    class Meta:

        model = Follow
        fields = "__all__"
        ordering = ["followed_on"]
        depth = 1


class FavoriteSerializer(serializers.ModelSerializer):
    favorited_by = UserSerializer()
    recipe = RecipeSerializer(many=True)

    class Meta:

        model = Favorite
        fields = "__all__"
