FROM php:7.4-fpm

ENV TZ Asia/Tokyo
ENV COMPOSER_ALLOW_SUPERUSER 1

# Strict error settings & Add packages to use
RUN set -eux && \
    apt-get update -qq && \
    apt-get install -y \
        libzip-dev \
        libpq-dev \
        git \
        zip \
        unzip \
        make \
        vim \
        sqlite3

# Install php library & composer
RUN docker-php-ext-install pdo pdo_pgsql zip && \
    curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer && \
        chmod +x /usr/local/bin/composer

WORKDIR /home/bookbok
COPY ./composer.json ./
COPY ./composer.lock ./

# install package & migration
RUN /usr/local/bin/composer install

COPY . .

# Generate sqlite3 non-interactively & Prepare to launch laravel
RUN sqlite3 ./database/database.sqlite "" && \
    php artisan migrate --froce && \
    chmod -R 777 storage && \
    php artisan passport:install