#!/bin/sh

set -eu

PHP_FPM_GID=33

if [ "$(id -u)" -ne 0 ]; then
    echo "Error: this script must be run with sudo." >&2
    echo "Run: sudo ./setup-permissions.sh" >&2
    exit 1
fi

for path in backend/storage backend/bootstrap/cache; do
    if [ ! -d "$path" ]; then
        echo "Error: $path was not found. Run this script from the repository root." >&2
        exit 1
    fi
done

# Keep the host user's ownership and share write access with PHP-FPM (www-data).
chgrp -R "$PHP_FPM_GID" backend/storage backend/bootstrap/cache
find backend/storage backend/bootstrap/cache -type d -exec chmod 2775 {} +
find backend/storage backend/bootstrap/cache -type f -exec chmod 0664 {} +

echo "Permissions configured for backend/storage and backend/bootstrap/cache."
