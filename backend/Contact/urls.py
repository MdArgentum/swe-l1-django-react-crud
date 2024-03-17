from django.urls import path
from .views import ContactListCreateAPIView, ContactRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('contact/', ContactListCreateAPIView.as_view(), name='contact-list-create'),
    path('contact/<int:pk>/', ContactRetrieveUpdateDestroyAPIView.as_view(), name='contact-retrieve-update-destroy'),
]
