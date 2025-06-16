from rest_framework.routers import DefaultRouter
from .views import BudgetViewSet, TransactionViewSet


router = DefaultRouter()
router.register('budgets', BudgetViewSet)
router.register('transactions', TransactionViewSet)


urlpatterns = router.urls
