from django.urls import path

from .views import CardListCreateAPIView

urlpatterns = [
    path('', CardListCreateAPIView.as_view(), name='card'),
]
