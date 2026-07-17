FROM composer:2 AS composer

FROM php:8.4-fpm

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y --no-install-recommends \
        nginx \
        libpq-dev \
        libzip-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype-dev \
        libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        pdo_pgsql \
        zip \
        bcmath \
        mbstring \
        exif \
        pcntl \
        gd \
    && rm -rf /var/lib/apt/lists/*

COPY docker/php/php.ini /usr/local/etc/php/conf.d/php.ini

WORKDIR /var/www/html

COPY backend/ /var/www/html/

RUN mkdir -p storage/app/public/media/seed \
    && cp -R database/seeders/assets/media/. storage/app/public/media/seed/ \
    && chown -R www-data:www-data storage/app/public

RUN composer install \
        --no-dev \
        --optimize-autoloader \
        --no-interaction \
        --no-progress

COPY docker/render/nginx.conf /etc/nginx/templates/default.conf.template
COPY --chmod=755 docker/render/start.sh /usr/local/bin/render-start

CMD ["render-start"]
