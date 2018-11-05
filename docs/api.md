FORMAT: 1A
HOST: http://bookbok.com

# BOOKBOK API

BOOKBOK　API仕様書

# Group USERS

## USERS [/api/users]

### 全ユーザ情報を取得する [GET /api/users]

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

### 特定のユーザ情報を取得する [GET /api/users/{userId}]

+ Parameters

    + userId(number) - ユーザID

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "user name",
            "avator": "http://~",
            "description": "user info"
        }


# Group BOOKS

## BOOKS [/api/books]

### すべての本の情報を取得する [GET /api/books]
// HACK: こんなに情報いる？ id, name, coverだけでもあり

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

### 特定の本の情報を取得する [GET /api/books/{bookId}]

+ Parameters

    + bookId(number) - 本のISBN

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

## USERBOOKS [/api/users/{userId}/user_books]

### あるユーザの本情報一覧を取得する（本棚相当） [GET /api/users/{userId}/user_books]
// HACK: userの本棚を見たときに、本の詳細な情報は必要なのか？タイトル、画像などでいいのでは？
// HACK: user_booksの配列にするのは処理が面倒になったり、直感的ではないか

+ Parameters

    + userId(number) - ユーザID

+ Response 200 (application/json)

        {
            "user": {
                "id": 1,
                "name": "user name",
                "avator": "http://~",
                "description": "user info"
            },
            "user_books": [
                {
                    "id": 1,
                    "book": {
                        "id": 1,
                        "name": "book name",
                        "description": "book info",
                        "cover": "http://~",
                        "author": "武田 信玄",
                        "genre_id": 1
                    }
                },
                {
                    "id": 2,
                    "book": {
                        "id": 2,
                        "name": "book name",
                        "description": "book info",
                        "cover": "http://~",
                        "author": "武田 信玄",
                        "genre_id": 1
                    }
                }
            ]
        }

### あるユーザの特定の本情報を取得する　[GET /api/users/{userId}/user_books/{userBookId}]

+ Parameters

    + userId(number) - ユーザID
    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Response 200 (application/json)

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
                    "id": 2,
                    "body": "bok body",
                    "page_num_begin": 6,
                    "page_num_end": 10,
                    "line_num": 1,
                    "published_at": "2018-11-11 10:30"
                }
            ]
        }

### あるユーザの本棚に本を新規登録する　[POST /api/users/{userId}/user_books]
裏で存在しない本は登録後、本棚に追加される。
本棚に追加しただけの場合、Responseのreviewやboksはempty。
// TODO: Requestにtitleや画像での追加も入れたりする？

+ Parameters

    + userId(number) - ユーザID

+ Request (application/json)

        {
            "book_id": "本のISBN"
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

### あるユーザの特定の本情報を本棚から削除する [DELETE /api/users/{userId}/user_books/{userBookId}]

+ Parameters

    + userId(number) - ユーザID
    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Response 200 (application/json)

        None


# Group GENRES

## GENRES [/api/genres]

### ジャンル一覧 [GET /api/genres]

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

### 特定ジャンル情報 [GET /api/genres/{genreId}]

+ Parameters

    + genreId(number) - ジャンルID

+ Response 200 (application/json)

        {
            "id": 1,
            "name": "genre name"
        }


# Group REVIEW

## REVIEW [/api/user_books/{userBookId}/review]

### レビュー情報の取得 [GET /api/user_books/{userBookId}/review]
// TODO: user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Response 200 (application/json)

        {
            "id": 1,
            "body": "review body",
            "published_at": "2018-11-11 10:30",
            "user_book_id": 1,
            "user_id": 1
        }

### レビュー情報の投稿 [POST /api/user_books/{userBookId}/review]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Request (application/json)

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

### レビュー情報の更新 [PUT /api/user_books/{userBookId}/review]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Request (application/json)

        {
            "body": "review body"
        }


+ Response 201 (application/json)

        None

###　レビュー情報の削除 [DELETE /api/user_books/{userBookId}/review]

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

+ Response 200 (application/json)

        None


# Group BOK

## BOK [/api/user_books/{userBookId}/boks]

### BOKの一覧情報を取得する(BOKS相当) [GET /api/user_books/{userBookId}/boks]
// TODO: user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Parameters

    + userBookId(number) - UserとBookの中間テーブルカラムのID

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

### BOK単体の情報を取得する [GET /api/user_books/{userBookId}/boks/{bokId}]
// TODO: bokを単体だけで見る機能は必要？(/boks/{bokId})
// TODO: user_booksの詳細でreview、boksを返すのでもはや必要ないのでは？

+ Parameter

    + userBookId(number) - UserとBookの中間テーブルカラムのID
    + bokId(number) - BOKのID

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

## FOLLOWERS [/api/users/{userId}/followers]

### 自分をフォローしている人の一覧を取得する [GET /api/users/{userId}/followers]

+ Parameter

    + userId(number) - ユーザーのID

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

##  FOLLOWINGS [/api/users/{userId}/following]

### 自分がフォローしている人の一覧を取得する [GET /api/users/{userId}/following]
// TODO: followingの詳細が見たい場合は、userの詳細を叩く

+ Parameter

    + userId(number) - ユーザーのID

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

### 新しくフォローする [POST /api/users/{userId}/following]
Requestの`user_id`はフォローするユーザーのID

+ Parameter

    + userId(number) - ユーザーのID

+ Request (application/json)

        {
            "user_id": 1
        }


+ Response 201 (application/json)

        None

### フォローを解除する [DELETE /api/users/{userId}/following/{targetUserId}]

+ Parameter

    + userId(number) - ユーザーのID
    + targetUserId(number) - フォロー対象のユーザID

+ Response 200 (application/json)

        None


# Group LIKES

## USER LIKES [/api/users/{userId}/likes]

### 自分がいいねしたbokの一覧を取得する [GET /api/users/{userId}/likes]
// TODO: [1, 2]みたいにbok_idだけをバルク処理で配列取得する？

+ Parameter

    + userId(number) - ユーザーのID

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

## BOK LIKES [/api/boks/{bokId}/likes]

### bokをいいねした人の一覧を取得する [GET /api/boks/{bokId}/likes]
// TODO: [1, 2]みたいにuser_idだけをバルク処理で配列取得する？

+ Parameter

    + bokId(number) - bokのID

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

### 新しくいいねする [POST /api/boks/{bokId}/likes]

+ Parameter

    + bokId(number) - bokのID

+ Response 201 (application/json)

        None

### いいねを解除する [DELETE /api/boks/{bokId}/likes/{likeId}]

+ Parameter

    + bokId(number) - bokのID
    + likeId(number) - likeテーブルカラムのID

+ Response 200 (application/json)

        None


# Group LOVES

## USER LOVES [/api/users/{userId}/loves]

### 自分がloveしたbokの一覧を取得する [GET /api/users/{userId}/loves]

+ Parameter

    + userId(number) - ユーザーのID

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

## BOK LOVES [/api/boks/{bokId}/loves]

### bokをloveした人の一覧を取得する [GET /api/boks/{bokId}/loves]
// TODO: [1, 2]みたいにuser_idだけをバルク処理で配列取得する？

+ Parameter

    + bokId(number) - bokのID

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

### bokをloveする [POST /api/boks/{bokId}/loves]

+ Parameter

    + bokId(number) - bokのID

+ Response 201 (application/json)

        None

### loveを解除する [DELETE /api/boks/{bokId}/loves/{loveId}]

+ Parameter

    + bokId(number) - bokのID
    + loveId(number) - loveテーブルカラムのID

+ Response 200 (application/json)

        None
