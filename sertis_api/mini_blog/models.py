from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Card(models.Model):

    def __str__(self):
        return self.name

    name = models.CharField(max_length=255, default='')
    status = models.BooleanField(help_text='ACTIVE OR INACTIVE', default=True)
    content = models.CharField(max_length=4000, default='')
    category = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
