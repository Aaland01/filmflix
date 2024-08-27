from rest_framework.serializers import ModelSerializer, SerializerMethodField, Serializer
from .models import Movie, Rating

class MovieSerializer(ModelSerializer):
  class Meta:
    model = Movie
    fields = ['id', 'title', 'genre', 'year', 'description', 'poster']
    read_only_fields = ['poster']

class RatingSerializer(ModelSerializer):
  class Meta:
    model = Rating
    fields = ['user', 'movie', 'rating', 'favorite', 'description']

  def create(self, validated_data):
    return Rating.objects.create(**validated_data)

class RatedMovieSerializer(ModelSerializer):
  class Meta:
      model = Rating
      fields = ['user', 'movie', 'rating', 'description']
      read_only_fields = ['movie']
  
  movie = SerializerMethodField()

  def get_movie(self, obj):
    return MovieSerializer(obj.movie).data if obj else None
    
class FavoriteMovieSerializer(ModelSerializer):
  class Meta:
    model = Rating
    fields = ['movie', 'rating', 'favorite', 'description']
    read_only_fields = ['movie']

  movie = SerializerMethodField()

  def get_movie(self, obj):
    return MovieSerializer(obj.movie).data if obj.favorite else None
  
class GenreSerializer(Serializer):
    top_genre = SerializerMethodField()

    class Meta:
        fields = ['top_genre']

    def get_top_genre(self, obj):
      return obj