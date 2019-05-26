from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import User, Recipe, Follow, Favorite
from .serializers import (
    UserSerializer,
    RecipeSerializer,
    FollowSerializer,
    FavoriteSerializer,
)


class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=["GET"])
    def country(self, request):
        same_country = request.GET.get("country", "")
        res = User.objects.filter(country=same_country)
        serializer = self.get_serializer(res, many=True)

        return Response(serializer.data)


class RecipeViewSet(viewsets.ModelViewSet):

    serializer_class = RecipeSerializer
    queryset = Recipe.objects.all()
    parser_classes = (
        JSONParser,
        FormParser,
        MultiPartParser,
    )

    @action(detail=False, methods=["GET"])
    def user_recipes(self, request):
        user_id = request.GET.get("user_id", 0)
        res = Recipe.objects.filter(owner=user_id)

        serializer = self.get_serializer(res, many=True)
        return Response(serializer.data)


class FollowViewSet(viewsets.ModelViewSet):

    serializer_class = FollowSerializer
    queryset = Follow.objects.all()

    @action(detail=False, methods=['GET'])
    def user_follows(self, request):
        user_id = request.GET.get("user_id", 0)

        res = Follow.objects.filter(user__id=user_id)

        serializer = self.get_serializer(res, many=True)
        return Response(serializer.data)


class FavoriteViewSet(viewsets.ModelViewSet):

    serializer_class = FavoriteSerializer
    queryset = Favorite.objects.all()

    @action(detail=False, methods=['GET', 'PATCH'])
    def user_favorites(self, request):
        user_id = request.GET.get("user_id", 0)

        res = Favorite.objects.filter(favorited_by__id=user_id)

        serializer = self.get_serializer(res, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def single_favorite(self, request):
        user_id = request.GET.get("user", 0)
        recipe_id = request.GET.get("recipe", 0)

        res = Favorite.objects.filter(recipe__id=recipe_id,
                                      favorited_by__id=user_id)

        serializer = self.get_serializer(res, many=True)
        return Response(serializer.data)
