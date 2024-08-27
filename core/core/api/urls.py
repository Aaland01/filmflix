from rest_framework.routers import DefaultRouter
from movies.api.urls import movie_router
from django.urls import path, include

router = DefaultRouter()

router.registry.extend(movie_router.registry)
urlpatterns = [
    path('api/', include(router.urls)),
]