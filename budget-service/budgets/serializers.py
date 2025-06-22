from rest_framework import serializers
from .models import Budget, Entry


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ['id', 'date', 'what', 'category', 'price']


class BudgetSerializer(serializers.ModelSerializer):
    entries = EntrySerializer(many=True, read_only=True)
    owner_id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Budget
        fields = ['id', 'name', 'owner_id', 'entries']
