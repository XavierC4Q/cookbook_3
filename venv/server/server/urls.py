from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from cookbook.views import UserViewSet, RecipeViewSet, FollowViewSet, FavoriteViewSet

router = DefaultRouter()

router.register(r"user", UserViewSet, "User")
router.register(r"recipe", RecipeViewSet, "Recipe")
router.register(r"follow", FollowViewSet, "Follow")
router.register(r"favorite", FavoriteViewSet, "Favorite")

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    path("admin/", admin.site.urls),
    url(r"^rest_auth/", include("rest_auth.urls")),
    url(r"^rest_auth/signup/", include("rest_auth.registration.urls")),
    url(r"^cookbook/", include(router.urls)),
]
