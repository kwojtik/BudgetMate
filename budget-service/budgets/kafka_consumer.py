from kafka import KafkaConsumer
import threading
import json
from .models import Budget


def consume_user_registered():
    consumer = KafkaConsumer(
        'user_registered',
        bootstrap_servers='kafka:9092',
        value_deserializer=lambda m: json.loads(m.decode('utf-8')),
        group_id='budget-group'
    )
    for msg in consumer:
        data = msg.value
        Budget.objects.create(name=f"{data['email']}'s Budget", owner_id=data['id'])


def start_kafka_consumer():
    thread = threading.Thread(target=consume_user_registered)
    thread.daemon = True
    thread.start()
