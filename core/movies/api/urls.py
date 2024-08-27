from rest_framework.routers import DefaultRouter
from ..views import MovieViewSet, RatingViewSet, SaveRatingView, FavoriteView, RecommandationsView, AllRatingViewSet, OtherMoviesView, SatireView

movie_router = DefaultRouter()
movie_router.register(r'movies', MovieViewSet)
movie_router.register(r'rated-movies', RatingViewSet, basename="Rated Movies")
movie_router.register(r'save-rating', SaveRatingView, 'save-rating')
movie_router.register(r'favorite-movies', FavoriteView, 'favorite-movies')
movie_router.register(r'recommended-movies', RecommandationsView, 'recommended-movies')
movie_router.register(r'all-rated-movies', AllRatingViewSet, 'all-rated-movies')
movie_router.register(r'other-movies', OtherMoviesView, 'other-movies')
movie_router.register(r'satire-movies', SatireView, 'satire-movies')
