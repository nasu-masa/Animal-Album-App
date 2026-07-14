#!/bin/sh

set -eu

for path in /var/www/html/storage /var/www/html/bootstrap/cache; do
    if ! su -s /bin/sh www-data -c "test -w '$path'"; then
        relative_path=${path#/var/www/html/}
        echo "Error: PHP-FPM user www-data cannot write to backend/$relative_path." >&2
        echo "Run the following command from the repository root, then start the containers again:" >&2
        echo "  sudo ./setup-permissions.sh" >&2
        exit 1
    fi
done

exec docker-php-entrypoint "$@"
