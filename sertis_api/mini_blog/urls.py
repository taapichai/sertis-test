from django.urls import path

from .views import CardListCreateAPIView, CardRetrieveDestroyUpdateAPIView

urlpatterns = [
    path('', CardListCreateAPIView.as_view(), name='card-list-create'),
    path('<int:id>/', CardRetrieveDestroyUpdateAPIView.as_view(), name="card-destroy"),
]
