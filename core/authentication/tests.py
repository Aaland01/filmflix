from django.test import TestCase
from django.contrib.auth.models import User


class UserTestCase(TestCase):
    def setUp(self):
        
        User.objects.create_superuser(username="olav", email="olav@test.com", password="123")
        User.objects.create_superuser(username="arvid", email="arvid@test.no", password="qwerty")
        
    def test_movie_users(self):
        olav = User.objects.get(username="olav")
        arvid = User.objects.get(username="arvid")
        self.assertEqual(olav.email, 'olav@test.com')
        self.assertTrue(olav.is_staff)
        self.assertEqual(arvid.username, 'arvid')
        self.assertFalse(not arvid.is_superuser)
        
    
