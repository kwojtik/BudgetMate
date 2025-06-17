import os
import django
import json
from kafka import KafkaConsumer

# Konfiguracja środowiska Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'budget_service.settings')
django.setup()

from budgets.models import Budget, LocalUser

def start_kafka_consumer():
    print("▶ Uruchamianie Kafka Consumer (user_registered)")

    consumer = KafkaConsumer(
        'user_registered',
        bootstrap_servers='localhost:9092',
        group_id='budget-service',
        value_deserializer=lambda x: json.loads(x.decode('utf-8')),
        auto_offset_reset='earliest',
        enable_auto_commit=True,
    )

    for message in consumer:
        data = message.value
        user_id = int(data.get('id'))
        email = data.get('email')

        print(f"Odebrano użytkownika: {email} (id={user_id})")

        # 1. Dodaj użytkownika lokalnie (jeśli nie istnieje)
        if not LocalUser.objects.filter(id=user_id).exists():
            LocalUser.objects.create_user(
                id=user_id,
                email=email,
                password=None,
            )
            print(f"Dodano LocalUser({user_id})")

        # 2. Dodaj domyślny budżet (jeśli nie istnieje)
        if not Budget.objects.filter(owner_id=user_id).exists():
            Budget.objects.create(
                name=f"Budżet domowy - {email}",
                owner_id=user_id,
            )
            print(f"Dodano domyślny budżet dla {email}")
        else:
            print(f"Budżet już istnieje")
