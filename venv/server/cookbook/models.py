from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.postgres.fields import ArrayField

class User (AbstractUser):

    username = models.CharField(max_length=16, blank=False, null=False, unique=True)
    email = models.EmailField(blank=True, null=True)
    country = models.CharField(max_length=30, blank=False, null=False)


    def __str__(self):
        return self.username

class Follow (models.Model):

    user = models.ForeignKey(User, related_name='user_follows', on_delete=models.CASCADE)
    follows = models.ForeignKey(User, related_name='follows_user', on_delete=models.CASCADE)
    followed_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username + ' follows ' + self.follows.username


class Recipe (models.Model):

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=50, blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    ingredients = ArrayField(
        models.CharField(max_length=50, blank=False, null=False),
        blank=False, null=False
    )

