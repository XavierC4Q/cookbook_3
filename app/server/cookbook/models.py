from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField, JSONField
from django.core.validators import MinLengthValidator


class User(AbstractUser):

    username = models.CharField(
        max_length=16,
        blank=False,
        null=False,
        unique=True,
        validators=[MinLengthValidator(6)]
    )
    email = models.EmailField(blank=True, null=True)
    country = models.CharField(
        max_length=30, 
        blank=False, 
        null=False,
        validators=[MinLengthValidator(4)]
    )
    profile_image = models.ImageField(
        upload_to="uploads/users",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.username


class Follow(models.Model):

    user = models.ForeignKey(
        User, related_name="user_follows", on_delete=models.CASCADE
    )
    follows = models.ManyToManyField(User)
    followed_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.id} follows'


class Recipe(models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_name = models.CharField(
        max_length=50,
        blank=False,
        null=False,
        unique=True,
        validators=[MinLengthValidator(10)]
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    image = models.ImageField(
        upload_to="uploads/recipes",
        blank=True,
        null=True
    )
    ingredients = JSONField(default=dict)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.recipe_name


class Favorite(models.Model):

    favorited_by = models.ForeignKey(
        User, related_name='user_recipe_favorite', on_delete=models.CASCADE
        )
    recipe = models.ManyToManyField(Recipe)

    def __str__(self):
        return f'Recipe Favorite {self.id}'
