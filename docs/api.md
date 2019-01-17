FORMAT: 1A
HOST: http://bookbok.com

# BOOKBOK API

BOOKBOK　API仕様書

# Group AUTHENTICATION

`/api/auth/login`を叩いて正常に認証されるとアクセストークンが発行される。

認証が必要なリソースにアクセスする際に`Authorization: Bearer アクセストークン`を指定すると、
それだけでユーザ認証が行われる。

## Login [/api/auth/login]

### ログインする [POST]

+ Request (application/json)

    + Attributes

        + email (required)
        + password (required)

    + Body

            {
                "email": "example@example.com",
                "password": "password"
            }

+ Response 200 (application/json)

        {
            "token": "eyJ0e...ZN2z0"
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMessage":{
                "email": [
                    "validation.required"
                ],
                "password": [
                    "validation.required"
                ]
            }
        }

+ Response 422 (application/json)

        {
            "status":422,
            "userMessage": "認証に失敗しました。"
        }

## Logout [/api/auth/logout]

### ログアウトする [GET]

+ Response 200 (application/json)

        {
            "userMessage": "ログアウトしました。"
        }

+ Response 401 (application/json)

        {
            "status":401,
            "userMessage": "権限がありません。"
        }

## Yourself [/api/auth/user]

### 認証したユーザーの情報を取得する [GET]

+ Response 200 (application/json)

        {
            "id": 1,
            "email": "example@example.com",
            "email_verified_at": null,
            "avatar": "https://avatars0.githubusercontent.com/u/22770924",
            "description": "",
            "created_at": "2018-10-24 15:53:09",
            "updated_at": "2018-10-24 15:53:09",
            "role_id": "1",
            "name": "あいえええ"
        }

+ Response 401 (application/json)

        {
            "status":401,
            "userMessage": "権限がありません。"
        }

## Register [/api/auth/register]

### ユーザを新規登録する [POST]

新規ユーザ登録を完了すると、
`/auth/email/verify?expires={expires}&signature={signature}`へのリンクを記載したメールが送信される。

+ Request (application/json)

    + Attributes

        + email (required)
        + password (required)
        + name (required)

    + Body

            {
                "email": "example@example.com",
                "password": "password",
                "name": "あいえええ"
            }

+ Response 200 (application/json)

        {
            "userMessage": "ユーザ登録に成功しました。ログインしましょう！"
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMessage":{
                "name":[
                    "validation.required"
                ],
                "email":[
                    "validation.required"
                ],
                "password":[
                    "validation.required"
                ]
            }
        }

## Email Verify [/api/auth/email/verify/{userId}{?expires,signature}]

+ Parameters

    + userId: 1 (number) - ユーザID
    + expires: 1544667062 (number) - 失効日時
    + signature: 40ae63c8777d0be61147751644ec3180ff2dc87f0111657ff7e6eece2c8c6cae (hex) - 署名

### メールアドレス検証を完了する [GET]

+ Response 200 (application/json)

        {
            "userMessage": "有効化に成功しました。"
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMessage": "有効化に失敗しました。"
        }

+ Response 401 (application/json)

        {
            "status":401,
            "userMessage": "権限がありません。"
        }

+ Response 403 (application/json)

        {
            "status":403,
            "userMessage": "シグネチャが不正です。"
        }

+ Response 429 (application/json)

        {
            "status":429,
            "userMessage": "試行回数が多すぎます。"
        }

## Email Verify Resend [/api/auth/email/resend]

### メールアドレス検証メールを再送する [GET]

+ Response 200 (application/json)

        {
            "userMessage": "検証メールを再送信しました。確認をお願いします。"
        }

+ Response 200 (application/json)

        {
            "userMessage": "有効化に成功しました。"
        }

+ Response 401 (application/json)

        {
            "status":401,
            "userMessage": "権限がありません。"
        }

+ Response 429 (application/json)

        {
            "status":429,
            "userMessage": "試行回数が多すぎます。"
        }

## Password Reset Mail Send [/api/auth/password/reset/send]

### パスワードリセットメールを送信する [POST]

`/auth/password/reset?token={token}`へのリンクを記載したメールが送信される。

+ Request (application/json)

    + Attributes

        + email (required)

    + Body

            {
                "email": "example@example.com"
            }

+ Response 200 (application/json)

        {
            "userMessage": "リセット用のリンクを送信しました。登録されているメールの確認をお願いします。"
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMassage"{
                "email":[
                    "validation.required"
                ]
            }
        }

+ Response 429 (application/json)

        {
            "status":429,
            "userMessage": "試行回数が多すぎます。"
        }

## Password Reset [/api/auth/password/reset]

### パスワードをリセットする [POST]

+ Request (application/json)

    + Attributes

        + email: user@example.com (required) - パスワードリセット対象ユーザのメールアドレス
        + password: newpassword (required) - アンパンマン！新しいパスワードよ
        + token (required) - メールで送られたリンクのクエリについているリセット用トークン

    + Body

            {
                "email": "example@example.com",
                "password": "new-password",
                "token": "5c4bc3f4b0258db9eedce3693dd75f066d76d80e0058db65b027e3143f03e3"
            }

+ Response 200 (application/json)

        {
            "userMessage": "パスワードの変更に成功しました。"
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMassage":{
                "email":[
                    "validation.required"
                ],
                "password":[
                    "validation.required"
                ],
                "token":[
                    "validation.required"
                ]
            }
        }

+ Response 400 (application/json)

        {
            "status":400,
            "userMessage": "パスワードの変更に失敗しました。"
        }

+ Response 429 (application/json)

        {
            "status":429,
            "userMessage": "試行回数が多すぎます。"
        }

# Group USERS

## Users [/api/users]

### 全ユーザ情報を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "id": "2",
                "name": "test-staff",
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": "",
                "created_at": "2018-11-19 04:58:55",
                "updated_at": "2018-11-19 04:58:55",
                "role_id": "5",
                "follower_count": "3",
                "following_count": "1",
                "is_follower": "1",
                "is_following": "1"
            }
        ]

## User [/api/users/{userId}]

+ Parameters

    + userId: 1 (number) - ユーザID

### 特定のユーザ情報を取得する [GET]

+ Response 200 (application/json)

        {
            "id": "2",
            "name": "test-staff",
            "avatar": "https://avatars0.githubusercontent.com/u/22770924",
            "description": "",
            "created_at": "2018-11-19 04:58:55",
            "updated_at": "2018-11-19 04:58:55",
            "role_id": "5",
            "follower_count": "3",
            "following_count": "1",
            "is_follower": "1",
            "is_following": "1"
        }

# Group BOOKS

## Books [/api/books{?q,genres,page}]

+ Parameters

    + q: keyword1 keyword2 genre:1 (string,optional) - フリーキーワード(タイトルと著者名の部分一致のAND)
    + genres (array,optional) - ジャンル(OR)
    + page - ページ数（指定がない場合はデフォルト1として処理される）

### すべての本の情報を取得する [GET]

> HACK:
 - こんなに情報いる？ id, name, coverだけでもあり

+ Response 200 (application/json)

        [
            {
                "id": "978412323333",
                "name": "book name",
                "description": "book info",
                "cover": "http://~",
                "author": "武田 信玄",
                "genre_id": 1
            },
            {
                "id": "978412323334",
                "name": "book name",
                "description": "book info",
                "cover": "http://~",
                "author": "武田 信玄",
                "genre_id": 1
            }
        ]

## Book [/api/books/{bookId}]

+ Parameters

    + bookId(number) - 本のISBN

### 特定の本の情報を取得する [GET]

+ Response 200 (application/json)

        {
            "book": {
                "id": 9,
                "isbn": "9782509953827",
                "name": "Rerum sint et velit.",
                "description": "しせいをごらんです。するときはきはきれいだから黒い川の向むこう。僕ぼくたちに祈いの高原じゃありました。天の川の水に落おちて来たってしました。「そうにゅうを見てある。ぼくたちがいて、「では二つにお話しかに男の子が、そのひとみんなに永久えいきおいようとして島しました。「ほんとうとこに行くのようにゅうの幸福こうにそこでおいよく見える」「あなた方へ飛とびらを押おさえきませんかくざとうのそとをくるのでした。「ジョバンニがこたわ」女の子にやに白くぼんや遠くかたをお持もって言いいの前を通ってこんなさい。岩いわいられて。",
                "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api",
                "author": "中津川 加奈",
                "genre_id": "1"
            },
            "reviews": [
                {
                    "user_id": "2",
                    "name": "test-staff",
                    "user_book_id": "1",
                    "body": "fugahoge",
                    "updated_at": "2019-01-17 12:02:56"
                },
                {
                    "user_id": "1",
                    "name": "admin",
                    "user_book_id": "1",
                    "body": "ぼくはどこか方角ほうさつが一つがぽかったんだからも、つるした。「この次つぎからです」カムパネルラの頬ほおを吹ふいて外を見ている影かげぼうでした。ジョバンニさんがステーションを通って、あるよりももうこの次つぎの木などは自分があっちへ来るから顔をそらにぼんやりそっちをとってたくなるように見つめたいしゃるんで帰った小さいといったくさんは」と答えましたかったように雑作ぞうさえたきれぎれのまん中に、ぺか消きえる。もってそれは四辺形しへ行くところしないか」青年にたくインデアンです」泣ない、その前をはじは、いました。。",
                    "updated_at": "2019-01-09 10:06:22"
                }
            ]
        }

# Group USERBOOKS

## UserBooks [/api/users/{userId}/user_books]

+ Parameters

    + userId(number) - ユーザID

### あるユーザの本棚を取得する [GET]

> HACK:
 - userの本棚を見たときに、本の詳細な情報は必要なのか？タイトル、画像などでいいのでは？

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "user name",
            "avator": "http://~",
            "description": "user info",
            "role_id": "10",
            "books": [
                {
                    "id": 1,
                    "name": "book name",
                    "description": "book info",
                    "cover": "http://example.com",
                    "author": "武田 信玄",
                    "genre_id": "1",
                    "pivot": {
                        "user_id": "1",
                        "book_id": "1",
                        "id": 1,
                        "reading_status": "0",
                        "is_spoiler": "1",
                        "created_at": "2018-09-11 10:11:00",
                        "updated_at": "2018-09-11 10:11:00"
                    }
                },
                {
                    "id": 2,
                    "name": "book name",
                    "description": "book info",
                    "cover": "http://example.com",
                    "author": "武田 信玄",
                    "genre_id": "1",
                    "pivot": {
                        "user_id": "1",
                        "book_id": "2",
                        "id": 2,
                        "reading_status": "0",
                        "is_spoiler": "0",
                        "created_at": "2018-09-11 10:11:00",
                        "updated_at": "2018-09-11 10:11:00"
                    }
                }
            ]
        }

### あるユーザの本棚に本を新規登録する　[POST]

> MEMO:
 - 裏で存在しない本は登録後、本棚に追加される。
 - 本棚に追加しただけの場合、Responseのreviewやboksはempty。

> TODO:
 - Requestにtitleや画像での追加も入れたりする？

+ Request (application/json)

    + Attributes

        + isbn (required)

    + Body

            {
                "isbn": "本のISBN"
            }

+ Response 201 (application/json)

        {
            "id": 1,
            "user": {
                "id": 1,
                "name": "user name",
                "avator": "http://~",
                "description": "user info"
            },
            "book": {
                "id": 1,
                "isbn": "9784111121221",
                "name": "book name",
                "description": "book info",
                "cover": "http://~",
                "author": "武田 信玄",
                "genre_id": 1
            },
            "review": {
                "id": 1,
                "body": "review body",
                "published_at": "2018-11-11 10:30",
                "user_book_id": 1,
                "user_id": 1
            },
            "boks": [
                {
                    "id": 1,
                    "body": "bok body",
                    "page_num_begin": 1,
                    "page_num_end": 1,
                    "line_num": 1,
                    "published_at": "2018-11-11 10:30"
                },
                {
                    "id": 1,
                    "body": "bok body",
                    "page_num_begin": 1,
                    "page_num_end": 1,
                    "line_num": 1,
                    "published_at": "2018-11-11 10:30"
                }
            ]
        }

## UserBooks [/api/users/{userId}/user_books/{userBookId}]

+ Parameters

    + userId(number) - ユーザID
    + userBookId(number) - UserとBookの中間テーブルカラムのID

### あるユーザの特定のユーザーブック(本棚の本)を取得する [GET]

+ Response 200 (application/json)

        {
            "id": 1,
            "user_id": "1",
            "book_id": "1",
            "reading_status": "0",
            "is_spoiler": false,
            "user":{
                "id": 1,
                "name": "admin",
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": ""
            },
            "book":{
                "id": 1,
                "isbn": "9788442163316",
                "name": "Autem expedita dolor culpa.",
                "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
            },
            "review":{
                "id": 1,
                "user_id": "1",
                "user_book_id": "1",
                "body": "カムパネルラがまた稜かどかどんどうせきへ戻もどこまでも行って上のゆるした",
                "published_at": "2018-11-25 04:31:30"
            },
            "boks":[
                {
                    "id": 1,
                    "user_id": "1",
                    "user_book_id": "1",
                    "page_num_begin": "184",
                    "page_num_end": "426",
                    "line_num": "82",
                    "body": "その子が言いいました。だんだん。それが惜おしてたよ。",
                    "published_at": "1972-05-16 06:56:03",
                    "created_at": "2018-11-13 07:07:21",
                    "updated_at": "2004-06-01 15:10:33",
                    "liked_count": "1",
                    "loved_count": "2",
                    "liked": "0",
                    "loved": "0",
                    "user_book":{
                        "id": 1,
                        "user_id": "1",
                        "book_id": "1",
                        "book":{
                            "id": 1,
                            "name": "Autem expedita dolor culpa.",
                            "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
                        },
                        "user":{
                            "id": 1,
                            "name": "admin",
                            "avatar": "https://avatars0.githubusercontent.com/u/22770924"
                        }
                    }
                }
            ]
        }

### あるユーザの特定のユーザーブックを更新する(読了ステータスやネタバレflg) [PUT]

> MEMO:
 - Requestの`reading_status`は読了ステータス(`none`, `wanted`, `unread`, `reading`, `readed`のどれか)

+ Request (application/json)

    + Attributes

        + is_spoiler (required)
        + reading_status (required)

    + Body

            {
                "is_spoiler": false,
                "reading_status": "wanted",
            }

+ Response 200 (application/json)

        {
            "id": 1,
            "user_id": "1",
            "book_id": "1",
            "reading_status": "0",
            "is_spoiler": false,
            "user":{
                "id": 1,
                "name": "admin",
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": ""
            },
            "book":{
                "id": 1,
                "isbn": "9788442163316",
                "name": "Autem expedita dolor culpa.",
                "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
            },
            "review":{
                "id": 1,
                "user_id": "1",
                "user_book_id": "1",
                "body": "カムパネルラがまた稜かどかどんどうせきへ戻もどこまでも行って上のゆるした",
                "published_at": "2018-11-25 04:31:30"
            },
            "boks":[
                {
                    "id": 1,
                    "user_id": "1",
                    "user_book_id": "1",
                    "page_num_begin": "184",
                    "page_num_end": "426",
                    "line_num": "82",
                    "body": "その子が言いいました。だんだん。それが惜おしてたよ。",
                    "published_at": "1972-05-16 06:56:03",
                    "created_at": "2018-11-13 07:07:21",
                    "updated_at": "2004-06-01 15:10:33",
                    "liked_count": "1",
                    "loved_count": "2",
                    "liked": "0",
                    "loved": "0",
                    "user_book":{
                        "id": 1,
                        "user_id": "1",
                        "book_id": "1",
                        "book":{
                            "id": 1,
                            "name": "Autem expedita dolor culpa.",
                            "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
                        },
                        "user":{
                            "id": 1,
                            "name": "admin",
                            "avatar": "https://avatars0.githubusercontent.com/u/22770924"
                        }
                    }
                }
            ]
        }

### あるユーザの特定のユーザーブックを本棚から削除する [DELETE]

+ Response 200 (application/json)

# Group GENRES

## Genres [/api/genres]

### ジャンル一覧を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "name": "genre name"
            },
            {
                "id": 2,
                "name": "genre name"
            }
        ]

## Genre [/api/genres/{genreId}]

+ Parameters

    + genreId(number) - ジャンルID

### 特定ジャンル情報を取得する [GET]

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "genre name"
        }


# Group REVIEW

## REVIEW [/api/user_books/{userBookId}/review]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

### レビュー情報の取得 [GET]

+ Response 200 (application/json)

        {
            "id": 1,
            "body": "review body",
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

### レビュー情報の投稿、または更新(PUT) [POST]

+ Request (application/json)

    + Attributes

        + boby (required)
        + publish

    + Body

            {
                "body": "review body",
                "publish": true
            }

+ Response 201 (application/json)

        {
            "id": 1,
            "body": "review body",
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

### レビュー情報の削除 [DELETE]

+ Response 200 (application/json)

# Group BOK

## Boks [/api/user_books/{userBookId}/boks]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

### BOKの一覧情報を取得する(BOKS相当) [GET]

> TODO:
 - user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "body": "bok body",
                "page_num_begin": 1,
                "page_num_end": 1,
                "line_num": 1,
                "published_at": "2018-11-11 10:30",
                "user_book_id": 1,
                "user_id": 1
            },
            {
                "id": 2,
                "body": "bok body",
                "page_num_begin": 1,
                "page_num_end": 1,
                "line_num": 1,
                "published_at": "2018-11-11 10:30",
                "user_book_id": 1,
                "user_id": 1
            }
        ]

### BOK単体の情報を登録する [POST]

+ Request (application/json)

    + Attributes

        + boby (required)
        + page_num_begin (number,required)
        + page_num_end (number,required)
        + line_num (number,required)

    + Body

            {
                "body": "bok body",
                "page_num_begin": 1,
                "page_num_end": 1,
                "line_num": 1,
                "publish": true
            }

+ Response 200 (application/json)

        {
            "id": 1,
            "body": "bok body",
            "page_num_begin": 1,
            "page_num_end": 1,
            "line_num": 1,
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

## Bok [/api/user_books/{userBookId}/boks/{bokId}]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID
    + bokId(number) - BOKのID

### BOK単体の情報を取得する [GET]

> TODO:
 - bokを単体だけで見る機能は必要？(/boks/{bokId})
 - user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Response 200 (application/json)

        {
            "id": 1,
            "body": "bok body",
            "page_num_begin": 1,
            "page_num_end": 1,
            "line_num": 1,
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

# Group BOKFLOW

## BOKFLOW [api/bok_flow]

### Bokフローを取得する [GET]

+ Response 200(application/json)

        [
            {
                "id": 3,
                "user_id": "1",
                "user_book_id": "1",
                "page_num_begin": "8",
                "page_num_end": "9",
                "line_num": "41",
                "body": "いっしゃのような青じろいあかいがすぐうしろからずにはたしました。にわから。ぼくわかれて流ながめていると、その遠くの遠くの方へ飛とび出しました。「あらゆるした。「ハレルヤ、ハレルヤ、ハレルヤ」前からこれをたてたくさんかしです。そのひびきや草花のに、にわらいでので、野原を見ている姉弟きょう」と言いいえず悲かなともあとかすか。いつとったのでした。すると、向こうごうせきにも言いいましくなったない、いきなまっくらいことができるようにわかにその中からだんだ。あした。ジョバンニの横よこたえません。双子ふたりとりです。。",
                "updated_at": "1970-07-02 13:13:19",
                "liked_count": "1",
                "loved_count": "2",
                "liked": "1",
                "loved": "1",
                "user_book": {
                    "id": 1,
                    "user_id": "1",
                    "book_id": "5",
                    "created_at": "2018-11-28 22:57:49",
                    "updated_at": "2018-11-28 22:57:49",
                    "is_spoiler": false,
                    "user": {
                        "id": 1,
                        "name": "admin"
                    },
                    "book": {
                        "id": 5,
                        "isbn": "9794417137824"
                    }
                }
            },
            {
                "id": 105,
                "user_id": "1",
                "user_book_id": "4",
                "page_num_begin": "368",
                "page_num_end": "628",
                "line_num": "6",
                "body": "遊あそばず、ひるならんなというんだ。中でとったりもいろな形を逆ぎゃありが言いえ、第一だいさつの地図に見えました。けれどもお父さん光る鷺さぎですか」そう思うとうの柵さく、水晶すいぎんと硫黄いおうとした。「いるのでした。「なんに、風のようなそうにそこかです。息いきも見わけです。ジョバンニは、どうしをたれだって、だんだり、袋ふくを求もとめたのです」「ええ、毎日注文ちゅうじかのいっぱいでしたら、牛乳ぎゅうや赤帽あかり覚悟かくひょうやの中にざあっているらしいことを分けていたのさいので、「あの女の子の、うや地球ちき。",
                "updated_at": "1971-05-04 10:09:09",
                "liked_count": "0",
                "loved_count": "0",
                "liked": "0",
                "loved": "0",
                "user_book": {
                    "id": 4,
                    "user_id": "1",
                    "book_id": "4",
                    "created_at": "2018-11-28 22:57:49",
                    "updated_at": "2018-11-28 22:57:49",
                    "is_spoiler": false,
                    "user": {
                        "id": 1,
                        "name": "admin"
                    },
                    "book": {
                        "id": 4,
                        "isbn": "9789662688320"
                    }
                }
            }
        ]

+ Response 401(application/json)

        [
            'status' => 401,
            'userMessage' => 'Bokフローの閲覧にはログインが必要です。'
        ]

# Group FOLLOWERS

## Followers [/api/users/{userId}/followers]

+ Parameter

    + userId(number) - ユーザーのID

### 指定したユーザをフォローしている人の一覧を取得する [GET]

認証トークンを送信しなかった場合`is_follower`と`is_following`を含まない。

+ Response 200 (application/json)

        [
            {
                "id": 2,
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": "hey",
                "created_at": "2018-11-19 04:58:55",
                "updated_at": "2018-11-19 04:58:55",
                "role_id": "5",
                "name": "test-staff",
                "is_follower": false,
                "is_following": false,
                "pivot":{
                    "target_id": "1",
                    "user_id": "2",
                    "id": 4,
                    "created_at": "2018-12-21 22:01:33",
                    "updated_at": "2018-12-21 22:01:33"
                }
            },
            {
                "id": 3,
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": "そのすぐに立って二人ふたりし",
                "created_at": "2018-11-23 10:34:01",
                "updated_at": "2009-08-12 07:17:49",
                "role_id": "10",
                "name": "三宅 春香",
                "is_follower": false,
                "is_following": true,
                "pivot":{
                    "target_id": "1",
                    "user_id": "3",
                    "id": 5,
                    "created_at": "2018-12-21 22:01:37",
                    "updated_at": "2018-12-21 22:01:37"
                }
            }
        ]

# Group FOLLOWINGS

## Followings [/api/users/{userId}/followings]

+ Parameter

    + userId(number) - ユーザーのID

### 指定したユーザがフォローしている人の一覧を取得する [GET]

認証トークンを送信しなかった場合`is_follower`と`is_following`を含まない。

+ Response 200 (application/json)

        [
            {
                "id": 2,
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": "hey",
                "created_at": "2018-11-19 04:58:55",
                "updated_at": "2018-11-19 04:58:55",
                "role_id": "5",
                "name": "test-staff",
                "is_follower": false,
                "is_following": false,
                "pivot":{
                    "user_id": "2",
                    "target_id": "1",
                    "id": 4,
                    "created_at": "2018-12-21 22:01:33",
                    "updated_at": "2018-12-21 22:01:33"
                }
            },
            {
                "id": 3,
                "avatar": "https://avatars0.githubusercontent.com/u/22770924",
                "description": "そのすぐに立って二人ふたりし",
                "created_at": "2018-11-23 10:34:01",
                "updated_at": "2009-08-12 07:17:49",
                "role_id": "10",
                "name": "三宅 春香",
                "is_follower": true,
                "is_following": false,
                "pivot":{
                    "user_id": "3",
                    "target_id": "1",
                    "id": 5,
                    "created_at": "2018-12-21 22:01:37",
                    "updated_at": "2018-12-21 22:01:37"
                }
            }
        ]

### 新しくフォローする [POST]

> MEMO:
 - Requestの`user_id`はフォローするユーザーのID

+ Request (application/json)

    + Attributes

        + user_id (number,required)

    + Body

            {
                "user_id": 1
            }

+ Response 201 (application/json)

## Following [/api/users/{userId}/followings/{targetUserId}]

+ Parameter

    + userId(number) - ユーザーのID
    + targetUserId(number) - フォロー対象のユーザID

### フォローを解除する [DELETE]

+ Response 200 (application/json)

# Group LIKES

## User Likes [/api/users/{userId}/likes]

+ Parameter

    + userId(number) - ユーザーのID

### 自分がいいねしたbokの一覧を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "user_id": "1",
                "user_book_id": "1",
                "page_num_begin": "184",
                "page_num_end": "426",
                "line_num": "82",
                "body": "の子が言いい。ただんだ。そした。するんでいっぱいに言いいました。「こっちまでもこってい本当ほんとうに足を、誰だれだわ」「ああ、すっかりのうちへ走りは、ひともうど、とうに入れるはずでさあ、ぼくがいありました。見えないいねいにひとはもういた、と深ふかいじゃないねいっぱなちぢめているばかりの手をつな上着うわ」「きみはわく足がふるうよ」「ぼくたべているとあすこの汽車は、暗やみの実みも、おいてくるのが四棟むねいって、何気なまいたというふうにそろえておいているのでした。青い鋼はがら叫さけびました。それが惜おしてたよ。",
                "published_at": "1972-05-16 06:56:03",
                "created_at": "2018-11-13 07:07:21",
                "updated_at": "2004-06-01 15:10:33",
                "liked_count": "1",
                "loved_count": "2",
                "liked": "0",
                "loved": "0",
                "user_book":{
                    "id": 1,
                    "user_id": "1",
                    "book_id": "1",
                    "book":{
                        "id": 1,
                        "name": "Autem expedita dolor culpa.",
                        "cover": "http://books.google.com/books/content?id=_42rGAAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api"
                    },
                    "user":{
                        "id": 1,
                        "name": "admin",
                        "avatar": "https://avatars0.githubusercontent.com/u/22770924"
                    }
                }
            }
        ]

## Bok Likes [/api/boks/{bokId}/likes]

+ Parameter

    + bokId(number) - bokのID

### bokをいいねした人の一覧を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "user_id": 1,
                "name": "user name",
                "avator": "http://~"
            },
            {
                "user_id": 2,
                "name": "user name",
                "avator": "http://~"
            }
        ]

### 新しくいいねする [POST]

+ Response 201 (application/json)

### いいねを解除する [DELETE]

+ Response 200 (application/json)

# Group LOVES

## User Loves [/api/users/{userId}/loves]

### 自分がloveしたbokの一覧を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "body": "bok body",
                "page_num_begin": 1,
                "page_num_end": 1,
                "line_num": 1,
                "published_at": "2018-11-11 10:30"
            },
            {
                "id": 2,
                "body": "bok body",
                "page_num_begin": 1,
                "page_num_end": 1,
                "line_num": 1,
                "published_at": "2018-11-11 10:30"
            }
        ]

## Bok Loves [/api/boks/{bokId}/loves]

### bokをloveした人の一覧を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "user_id": 1,
                "name": "user name",
                "avator": "http://~"
            },
            {
                "user_id": 2,
                "name": "user name",
                "avator": "http://~"
            }
        ]

### bokをloveする [POST]

+ Response 201 (application/json)

### loveを解除する [DELETE]

+ Response 200 (application/json)
