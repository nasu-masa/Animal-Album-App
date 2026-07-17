#!/usr/bin/env bash

set -e

PORT="${PORT:-10000}"

if [[ ! "$PORT" =~ ^[0-9]+$ ]]; then
    echo "PORT must be a number." >&2
    exit 1
fi

sed "s/\${PORT}/${PORT}/g" \
    /etc/nginx/templates/default.conf.template \
    > /etc/nginx/conf.d/default.conf

cd /var/www/html

mkdir -p storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
chmod -R ug+rwX storage bootstrap/cache

if [[ ! -e public/storage && ! -L public/storage ]]; then
    php artisan storage:link
fi

php artisan migrate --force
php artisan optimize

php-fpm --nodaemonize &
php_fpm_pid=$!

nginx -g "daemon off;" &
nginx_pid=$!

cleanup() {
    kill "$php_fpm_pid" "$nginx_pid" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

wait -n "$php_fpm_pid" "$nginx_pid"

echo "A required process exited unexpectedly." >&2
exit 1
