FROM php:7.4-fpm

ENV TZ Asia/Tokyo
ENV COMPOSER_ALLOW_SUPERUSER 1

RUN apt-get update -qq && \
    apt-get install -y \
        libpq-dev \
        git \
        zip \
        unzip \
        make \
        vim

# # RUN docker-php-ext-install common
#
# # Install composer
# RUN curl -sS https://getcomposer.org/installer | php && \
#     mv composer.phar /usr/local/bin/composer && \
#     chmod +x /usr/local/bin/composer
#
# WORKDIR /home/bookbok
#
# COPY ./ /home/bookbok
# RUN /usr/local/bin/composer install -d /home/bookbok
