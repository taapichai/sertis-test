from rest_framework import serializers

from mini_blog.models import Card


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['id', 'name', 'status', 'content', 'category', 'author']
        depth = 1
