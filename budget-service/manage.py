import os
import sys


def main():
    """Uruchamia Django management utility."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'budget_service.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Nie można zaimportować Django. Upewnij się, że Django jest zainstalowane "
            "i dostępne w aktywnym środowisku."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
