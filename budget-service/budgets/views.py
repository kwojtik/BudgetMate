# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Budget, Entry
from .serializers import BudgetSerializer, EntrySerializer


class BudgetDetailView(generics.RetrieveAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer


class EntryCreateView(generics.CreateAPIView):
    serializer_class = EntrySerializer

    def perform_create(self, serializer):
        budget_id = self.kwargs['budget_id']
        serializer.save(budget_id=budget_id)


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
