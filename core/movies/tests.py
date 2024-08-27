from django.test import TestCase
from .models import Movie, Rating
from django.contrib.auth.models import User

class MovieTestCase(TestCase):
    
    def setUp(self):

        self.movie = Movie.objects.create(title="Testington", genre=Movie.COMEDY, year=2015)
        self.anotherMovie = Movie.objects.create(title="Testington 2", genre=Movie.HORROR, year=2018)
        
        User.objects.create_superuser(username="olav", email="olav@test.com", password="123")
        
    def test_movies(self):
        
        retrieved_movie1 = Movie.objects.get(id = self.movie.id)
        retrieved_movie2 = Movie.objects.get(id = self.anotherMovie.id)
        
        self.assertEqual(retrieved_movie1.title, "Testington")
        self.assertEqual(retrieved_movie1.genre, Movie.COMEDY)
        self.assertEqual(retrieved_movie1.year, 2015)
        
        self.assertEqual(retrieved_movie2.title, "Testington 2")
        self.assertEqual(retrieved_movie2.genre, Movie.HORROR)
        self.assertEqual(retrieved_movie2.year, 2018)
        
    def test_create_rating(self):
        
        olav = User.objects.get(username = "olav")
        rating = Rating.objects.create(user = olav, movie = self.movie, rating = 4) 
        
        retrieved_rating = Rating.objects.get(id=rating.id)
        
        self.assertEqual(retrieved_rating.user, olav)
        self.assertEqual(retrieved_rating.movie.title, "Testington")
        self.assertEqual(retrieved_rating.movie.year, 2015)
        self.assertEqual(retrieved_rating.movie.genre, Movie.COMEDY)
        self.assertEqual(retrieved_rating.rating, 4)
