from django.db.models import Count
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Movie, Rating
from .serializers import MovieSerializer, RatingSerializer, RatedMovieSerializer, FavoriteMovieSerializer

class MovieViewSet(ModelViewSet):
  queryset = Movie.objects.all()
  serializer_class = MovieSerializer

  search_fields = ['genre']

  def get_queryset(self):
    genre = self.request.query_params.get('genre',None)
    if genre:
      genre = genre.upper()
      queryset = Movie.objects.filter(genre=genre)
    else:
      queryset = Movie.objects.all()
    return queryset

class SaveRatingView(ModelViewSet):
  serializer_class = RatingSerializer
  queryset = Rating.objects.all()

  def create(self, request, *args, **kwargs):
    currentUser = self.request.user

    if currentUser.is_authenticated:
      request.data['user'] = currentUser.id
      return super().create(request, *args, **kwargs)

    else:
      return Response({"error": "Authentication error while rating movie"}, status.HTTP_401_UNAUTHORIZED)

class RatingViewSet(ModelViewSet):
  serializer_class = RatedMovieSerializer
  search_fields = ['genre']

  def get_queryset(self):
      currentUser = self.request.user

      if currentUser.is_authenticated:
          genre = self.request.query_params.get('genre',None)
          if(genre):
            genre = genre.upper()
            queryset = Rating.objects.filter(movie__genre=genre, user=currentUser)

          else:
             queryset = Rating.objects.filter(user=currentUser)
             
          if(not queryset.exists()):
             queryset = Rating.objects.none()
      else:
          queryset = Rating.objects.none()
      return queryset


class AllRatingViewSet(ModelViewSet):
  serializer_class = RatedMovieSerializer

  def get_queryset(self):
    queryset = Rating.objects.all()
    return queryset

  
class FavoriteView(ModelViewSet):
  serializer_class = FavoriteMovieSerializer
  queryset = Rating.objects.all()

  def get_queryset(self):
      currentUser = self.request.user
      if currentUser.is_authenticated:
          queryset = Rating.objects.filter(user=currentUser, favorite=True)
          if(not queryset.exists()):
            queryset = Rating.objects.none()
      else:
          queryset = Rating.objects.none()
      return queryset
  
class RecommandationsView(ModelViewSet):
    serializer_class = MovieSerializer

    def get_queryset(self):
        currentUser = self.request.user
        if currentUser.is_authenticated:
          ratings = Rating.objects.filter(user=currentUser)
          if ratings:
            genre = ratings.select_related('movie').values('movie__genre').annotate(count=Count('movie__genre')).order_by("-count").first()['movie__genre']
            ratings.filter(movie__genre=genre.upper())
            ratedIds = [ratedMovie.movie.id for ratedMovie in ratings]
            queryset = Movie.objects.filter(genre=genre.upper()).exclude(id__in = ratedIds)
            return queryset
        queryset = Movie.objects.all()
        return queryset
    
class OtherMoviesView(ModelViewSet):
  serializer_class = MovieSerializer
  search_fields = ['genre']

  def get_queryset(self):
    currentUser = self.request.user

    if currentUser.is_authenticated:
      ratedMovies = Rating.objects.filter(user=currentUser)
      if ratedMovies:
        ratedIds = [ratedMovie.movie.id for ratedMovie in ratedMovies]
        genre = self.request.query_params.get('genre',None)
        if genre:
          queryset = Movie.objects.filter(genre=genre).exclude(id__in = ratedIds)
        queryset = Movie.objects.exclude(id__in = ratedIds)
        return queryset
    return Movie.objects.all()
  
class SatireView(ModelViewSet):
  serializer_class = MovieSerializer

  def get_queryset(self):
    badMovies = [8, 53, 19, 11]

    queryset = Movie.objects.filter(id__in = badMovies)
    return queryset;


       
