from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Movie(models.Model):
  
  ACTION = 'ACTION'
  COMEDY = 'COMEDY'
  DRAMA = 'DRAMA'
  SCIFI = 'SCIFI'
  HORROR = 'HORROR'
  ROMANCE = 'ROMANCE'
  MUSICAL = 'MUSICAL'
  DOCUMENTARY = 'DOCUMENTARY'
  ANIMATION = 'ANIMATION'
  THRILLER = 'THRILLER'
  FANTASY = 'FANTASY'
  
  # Choices that determine genre
  GENRE_CHOICES = [
      (ACTION, 'Action'),
      (COMEDY, 'Comedy'),
      (DRAMA, 'Drama'),
      (SCIFI, 'Science Fiction'),
      (HORROR, 'Horror'),
      (ROMANCE, 'Romance'),
      (MUSICAL, 'Musical'),
      (DOCUMENTARY, 'Documentary'),
      (ANIMATION, 'Animation'),
      (THRILLER, 'Thriller'),
      (FANTASY, 'Fantasy')
    ]
  
  title = models.CharField(max_length=100)
  genre = models.CharField(max_length=50, choices=GENRE_CHOICES)
  year = models.PositiveIntegerField()
  description = models.TextField(max_length = 500, default='This movie is missing a description')
  poster = models.ImageField(upload_to='posters', default='MoviePosterExample.jpg')

  def __str__(self):
    return self.title
  

class Rating(models.Model):
    RATINGS = (
        (0, 'No rating'),
        (1, '1 star - Bad'),
        (2, '2 stars - Poor'),
        (3, '3 stars - OK'),
        (4, '4 stars - Good'),
        (5, '5 stars - Excellent')
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.IntegerField(default=0, choices=RATINGS)
    favorite = models.BooleanField(default=False)
    description = models.CharField(default='No comment', max_length = 100)

    class Meta:
       unique_together = ['user','movie']
       get_latest_by = "id"

    def __str__(self):
        return f"{self.movie.title}: {self.rating}"
