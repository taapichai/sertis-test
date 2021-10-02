# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from mini_blog.form import CardForm, CardDestroyUpdateForm
from mini_blog.models import Card
from mini_blog.permission import IsOwner
from mini_blog.serializers import CardSerializer


class CardListCreateAPIView(generics.ListCreateAPIView):
    queryset = []
    serializer_class = CardSerializer
    permission_classes = (IsAuthenticated, IsOwner)

    def get(self, request, *args, **kwargs):
        cards = Card.objects.all()
        serializer = CardSerializer(cards, many=True)
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
                author=request.user,
            )
            return Response(CardSerializer(card).data, status=status.HTTP_200_OK)
        else:
            return Response(card_form.errors, status=status.HTTP_400_BAD_REQUEST)


class CardRetrieveDestroyUpdateAPIView(generics.RetrieveDestroyAPIView, generics.UpdateAPIView):
    permission_classes = (IsAuthenticated, IsOwner)

    def get(self, request, *args, **kwargs):
        destroy_form = CardDestroyUpdateForm(self.kwargs)
        if destroy_form.is_valid():
            card = Card.objects.get(pk=self.kwargs['id'])
            return Response(CardSerializer(card).data, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        destroy_form = CardDestroyUpdateForm(self.kwargs)
        if destroy_form.is_valid():
            card = Card.objects.get(pk=self.kwargs['id'])
            self.check_object_permissions(self.request, card)
            card.delete()
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(destroy_form.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        id_form = CardDestroyUpdateForm(self.kwargs)
        card_form = CardForm(request.data)
        if id_form.is_valid() & card_form.is_valid():
            updating_card = Card.objects.get(pk=self.kwargs['id'])
            self.check_object_permissions(self.request, updating_card)
            updating_card.name = request.data['name']
            updating_card.status = request.data['status']
            updating_card.content = request.data['content']
            updating_card.category = request.data['category']
            updating_card.author = request.user
            updating_card.save()
            return Response(CardSerializer(updating_card).data, status=status.HTTP_200_OK)
        else:
            return Response(id_form.errors, status=status.HTTP_400_BAD_REQUEST)
