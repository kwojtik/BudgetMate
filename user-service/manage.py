#!/usr/bin/env python
import os
import sys

def main():
    """Uruchamia odpowiednie ustawienia Django i wykonuje komendy zarządzania."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'user_service.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Nie można załadować Django. Upewnij się, że Django jest zainstalowane i "
            "jest dostępne w Twoim środowisku wirtualnym."
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
