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
        sqlite3 \
        curl \
        nodejs

# Install php library & composer & npm
RUN docker-php-ext-install pdo pdo_pgsql zip && \
    curl -sS https://getcomposer.org/installer | php && \
        mv composer.phar /usr/local/bin/composer && \
        chmod +x /usr/local/bin/composer && \
RUN curl -SL https://deb.nodesource.com/setup_13.x | bash && \
    npm install -g npm@latest

WORKDIR /home/bookbok
COPY ./composer.json ./
COPY ./composer.lock ./
COPY ./package.json ./
COPY ./package.lock ./

COPY . .

# Install package
RUN /usr/local/bin/composer install
RUN npm install

# Generate sqlite3 non-interactively & Prepare to launch laravel
RUN sqlite3 ./database/database.sqlite "" && \
    php artisan migrate --force && \
    chmod -R 777 storage && \
    php artisan passport:install
