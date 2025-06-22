# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Budget, LocalUser
from .serializers import BudgetSerializer, EntrySerializer


class BudgetDetailView(generics.RetrieveAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


class EntryCreateView(generics.CreateAPIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = EntrySerializer

    def perform_create(self, serializer):
        budget = Budget.objects.get(pk=self.kwargs['budget_id'])
        serializer.save(budget=budget)


class BudgetListCreateView(generics.ListCreateAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print(">>> HEADERS:", self.request.META)
        print(">>> AUTHORIZATION:", self.request.META.get("HTTP_AUTHORIZATION"))
        print(">>> request.user:", self.request.user)
        print(">>> is_authenticated:", self.request.user.is_authenticated)
        return Budget.objects.filter(owner_id=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(owner_id=self.request.user.id)


class Test(generics.ListCreateAPIView):
    serializer_class = LocalUser

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return LocalUser.objects.filter(id=user_id)