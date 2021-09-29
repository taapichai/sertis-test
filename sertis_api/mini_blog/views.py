from django.shortcuts import render

# Create your views here.
from rest_framework import generics, status
from rest_framework.response import Response

from mini_blog import form
from mini_blog.form import CardForm
from mini_blog.models import Card
from mini_blog.serializers import CardSerializer


class CardListCreateAPIView(generics.ListCreateAPIView):
    queryset = Card.objects.filter(status=True)
    serializer_class = CardSerializer

    def get(self, request, *args, **kwargs):
        serializer = CardSerializer(self.get_queryset(), many=True)
        return Response(
            data=serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        card_form = CardForm(request.data)
        if card_form.is_valid():
            card = Card.objects.create(
                name=request.data['name'],
                status=request.data['status'],
                content=request.data['content'],
                category=request.data['category'],
                author=request.data['author'],
            )
            return Response(card, status=status.HTTP_200_OK)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
