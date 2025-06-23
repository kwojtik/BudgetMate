import os
import django


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "budget_service.settings")
django.setup()


from budgets.kafka_consumer import start_kafka_consumer


if __name__ == '__main__':
    start_kafka_consumer()
