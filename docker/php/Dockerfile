FROM composer:2 AS composer

FROM php:8.4-fpm

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update && apt-get install -y \
        libzip-dev \
        libpng-dev \
        libjpeg-dev \
        libfreetype-dev \
        libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        zip \
        bcmath \
        mbstring \
        exif \
        pcntl \
        gd \
    && rm -rf /var/lib/apt/lists/*

COPY docker/php/php.ini /usr/local/etc/php/conf.d/php.ini
COPY --chmod=755 docker/php/entrypoint.sh /usr/local/bin/backend-entrypoint

WORKDIR /var/www/html

ENTRYPOINT ["backend-entrypoint"]
CMD ["php-fpm"]
