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
            "email": [
                "validation.required"
            ],
            "password": [
                "validation.required"
            ]
        }

+ Response 422 (application/json)

        {
            "message": "Falid to authentication..."
        }

## Logout [/api/auth/logout]

### ログアウトする [GET]

+ Response 200 (application/json)

        {
            "message": "You have been successfully logged out!"
        }

+ Response 401 (application/json)

        {
            "message": "Unauthenticated."
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
            "message": "Unauthenticated."
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
            "message": "You have been successfully registerd user! Let's login."
        }

+ Response 400 (application/json)

        {
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

## Email Verify [/api/auth/email/verify/{userId}{?expires,signature}]

+ Parameters

    + userId: 1 (number) - ユーザID
    + expires: 1544667062 (number) - 失効日時
    + signature: 40ae63c8777d0be61147751644ec3180ff2dc87f0111657ff7e6eece2c8c6cae (hex) - 署名

### メールアドレス検証を完了する [GET]

+ Response 200 (application/json)

        {
            "message": "Your email has been successfully verified!"
        }

+ Response 400 (application/json)

        {
            "message": "Verification failed..."
        }

+ Response 401 (application/json)

        {
            "message": "Unauthenticated."
        }

+ Response 403 (application/json)

        {
            "message": "Invalid signature."
        }

+ Response 429 (application/json)

        {
            "message": "Too Many Attempts."
        }

## Email Verify Resend [/api/auth/email/resend]

### メールアドレス検証メールを再送する [GET]

+ Response 200 (application/json)

        {
            "message": "We successfully retransmitted the verification email."
        }

+ Response 200 (application/json)

        {
            "message": "Your email has been successfully verified!"
        }

+ Response 401 (application/json)

        {
            "message": "Unauthenticated."
        }

+ Response 429 (application/json)

        {
            "message": "Too Many Attempts."
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
            "message": "We successfully sent a mail with a link to the password reset page!"
        }

+ Response 400 (application/json)

        {
            "email":[
                "validation.required"
            ]
        }

+ Response 429 (application/json)

        {
            "message": "Too Many Attempts."
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
            "message": "You have successfully changed password!"
        }

+ Response 400 (application/json)

        {
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

+ Response 400 (application/json)

        {
            "message": "Password reset failure..."
        }

+ Response 429 (application/json)

        {
            "message": "Too Many Attempts."
        }

# Group USERS

## Users [/api/users]

### 全ユーザ情報を取得する [GET]

+ Response 200 (application/json)

        [
            {
                "id": 1,
                "name": "bookuser",
                "avatar": "https://...",
                "description": "Hi, I'm teaching network at Kobedenshi."
            },
            {
                "id": 2,
                "name": "bookuser",
                "avatar": "https://...",
                "description": "Hi, I'm teaching network at Kobedenshi."
            }
        ]

## User [/api/users/{userId}]

+ Parameters

    + userId: 1 (number) - ユーザID

### 特定のユーザ情報を取得する [GET]

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "user name",
            "avator": "http://~",
            "description": "user info"
        }


# Group BOOKS

## Books [/api/books]

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
            "id": "978412323334",
            "name": "book name",
            "description": "book info",
            "cover": "http://~",
            "author": "武田 信玄",
            "genre_id": 1
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

> REVIEW:
 - user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Response 200 (application/json)

        {
            "id": 1,
            "body": "review body",
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

### レビュー情報の投稿 [POST]

+ Request (application/json)

    + Attributes

        + boby (required)

    + Body

        {
            "body": "review body"
        }

+ Response 201 (application/json)

        {
            "id": 1,
            "body": "review body",
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

### レビュー情報の更新 [PUT]

+ Request (application/json)

    + Attributes

        + boby (required)

    + Body

        {
            "body": "review body"
        }

+ Response 201 (application/json)

###　レビュー情報の削除 [DELETE]

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


# Group FOLLOWERS

## Followers [/api/users/{userId}/followers]

+ Parameter

    + userId(number) - ユーザーのID

### 自分をフォローしている人の一覧を取得する [GET]

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


# Group FOLLOWINGS

## Followings [/api/users/{userId}/followings]

+ Parameter

    + userId(number) - ユーザーのID

### 自分がフォローしている人の一覧を取得する [GET]

> TODO:
 - followingの詳細が見たい場合は、userの詳細を叩く

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

### 新しくフォローする [POST]

> MEMO:
 - Requestの`user_id`はフォローするユーザーのID

+ Request (application/json)

    + Attributes

        + user_id (number,required)

    + Body
        None

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

