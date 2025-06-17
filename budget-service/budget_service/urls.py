from django.contrib import admin
from django.urls import path, include
from budgets.kafka_consumer import start_kafka_consumer


# start_kafka_consumer()


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('budgets.urls')),
]
