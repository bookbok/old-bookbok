# モックサーバーの使い方

## 問題点
以下の問題が発生するので、リンク先を見て解決しておく必要があります。

[npmでpermission deniedになった時の対処法](https://github.com/NAKKA-K/bookbok/wiki/npm%E3%81%A7permission-denied%E3%81%AB%E3%81%AA%E3%81%A3%E3%81%9F%E6%99%82%E3%81%AE%E5%AF%BE%E5%87%A6%E6%B3%95)

## 準備

モックサーバーを立ち上げるために、npmでライブラリをインストールする必要があります。

```bash
$ npm install -g drakov
```

## 起動

先ほどインストールした`drakov`というライブラリは、Blueprint記法で書いたAPI設計書を元にモックサーバーを自動的に立ち上げてくれる優れものです。

```bash
$ drakov -f docs/api.md -p 8080 --public
```

### 補足

- **ポートは8080番**
- Vagrantで立ち上げたモックサーバーに、ホストOS側からアクセスしたい場合`--public`をつける必要がある

## 終了

`Ctrl + c`で終了します。

## 参考

[Blueprintからモックサーバーを爆速で作る](https://qiita.com/NAKKA-K/items/0b094e1174f1076fd664)
