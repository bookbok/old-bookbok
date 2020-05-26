# BOOKBOK

# Getting started
It is assumed that you have **copied the .env file**.

[if npm permission denied](https://qiita.com/okoysm/items/ced3c3de30af1035242d)

```bash
# Start docker & Run laravel server
$ make docker/run

# Build react(non interactive)
$ docker-compose exec app npm run dev
$ docker-compose exec app make migrate/fresh
$ docker-compose exec app make migrate/test
```

*Let's access server* with browser!!
<http://localhost:8000>

# Install
composer & npm install

```bash
$ make install
```

# Run
Run laravel server.

```bash
$ make run
```

# Help
View the all command list.

```bash
$ make help
```

# Build react
Run webpack.

```bash
$ make build
```

# Debug on laravel
Run debugger on laravel tinker.

```bash
$ make c
```
