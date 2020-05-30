# BOOKBOK

- BookBok TOP: https://www.bookbok.net
- API: https://www.bookbok.net/api


# Getting started
まず最初に、GoogleDrive(DW2019/共有ファイル/)から`.env`ファイルをダウンロードしてプロジェクトルートに配置してください。

```bash
# Laravelサーバーが動くDockerコンテナを作成します。
$ make docker/run

# クライアントコードをビルドします。
# 初期状態ではビルドされていないのでローカルページは真っ白になります。
$ docker-compose exec app npm run dev

# DBの初期化、初期データ挿入をします。
$ docker-compose exec app make migrate/fresh
$ docker-compose exec app make migrate/test
```

以下のURLからローカルページにアクセスすることができます。
<http://localhost:8000>


# Install
PHPライブラリとJavaScriptライブラリをインストールします。
Dockerビルド後にこのコマンドを実行した場合、マウントされているためローカルにも反映されます。

ローカルでIDEなどの補完を効かせたい場合は一度このコマンドを実行する必要があります。

```bash
$ docker-compose exec app make install
```

# Client build
クライアントコードはファイルが変更されるたびにビルドする必要があります。
もし自動でビルドをしてほしいなら以下のコマンドを実行してください。

```bash
$ docker-compose exec app npm run watch
```

# Start interactive laravel
Laravelのtinker機能を使うと対話的に動作確認をすることができます。

```bash
$ docker-compose exec app make c
```
