from django.db import models


class Budget(models.Model):
    name = models.CharField(max_length=100)
    owner_id = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


class Transaction(models.Model):
    budget = models.ForeignKey(Budget, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    type = models.CharField(max_length=10, choices=[('income', 'Income'), ('expense', 'Expense')])
    category = models.CharField(max_length=50)
    date = models.DateField()
