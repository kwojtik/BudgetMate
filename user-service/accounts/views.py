from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import UserSerializer
from .kafka import send_kafka_message


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        data = serializer.validated_data

        user = CustomUser(
            username=data['username'],
            email=data['email'],
        )
        user.set_password(data['password'])
        user.save()

        send_kafka_message("user_registered", {
            "id": user.id,
            "email": user.email
        })
