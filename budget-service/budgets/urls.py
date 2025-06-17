from django.urls import path
from .views import BudgetDetailView, EntryCreateView, BudgetListCreateView


urlpatterns = [
    path('budgets/<int:pk>/', BudgetDetailView.as_view(), name='budget-detail'),
    path('budgets/<int:budget_id>/entries/', EntryCreateView.as_view(), name='entry-create'),
    path('budgets/', BudgetListCreateView.as_view(), name='budget-list-create'),
]
