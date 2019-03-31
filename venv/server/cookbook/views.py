from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Recipe, Follow
from .serializers import UserSerializer, RecipeSerializer, FollowSerializer


class UserViewSet (viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=['GET'])
    def country (self, request):
        same_country = request.GET.get('country', '')
        res = User.objects.filter(country=same_country)
        serializer = self.get_serializer(res, many=True)

        return Response(serializer.data)


class RecipeViewSet (viewsets.ModelViewSet):

    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()

    @action(detail=False, methods=['GET'])
    def user_recipes (self, request):
        user = request.GET.get('user_id', '')
        get_user = User.objects.filter(pk=user)
        serialize_user = self.get_serializer(get_user)

        if serialize_user.data is not None:

            res = Recipe.objects.filter(owner=serialize_user.data)
            serialize_res = self.get_serializer(res, many=True)
            return Response(serialize_res.data)
        
        return Response([])

class FollowViewSet (viewsets.ModelViewSet):

    serializer_class = FollowSerializer
    queryset = Follow.objects.all()
    