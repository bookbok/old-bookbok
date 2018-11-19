import React, { Component } from 'react';

//ログイン画面を表すコンポーネントを定義
export const Login = () => (
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-md-8">

                <div class="card">
                    <div class="card-header">ログイン</div>

                    <div class="card-body">
                        <form method="POST" action="">
                            <div class="form-group row">
                                <label htmlFor="email" class="col-sm-4 col-form-label text-md-right">Eメール</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email" required autoFocus />
                                </div>
                            </div>

                            <div class="form-group row">
                                <label htmlFor="password" class="col-md-4 col-form-label text-md-right">パスワード</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" name="password" required />
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="remember" id="remember" />
                                        <label class="form-check-label" htmlFor="remember">
                                            ログイン状態を保持する
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row d-flex flex-column align-items-center">
                                <button type="submit" class="btn btn-primary">
                                    ログイン
                                </button>

                                <a class="btn btn-link" href="#">
                                    パスワードを忘れましたか?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>{/* end card */}

            </div>
        </div>
    </div>
)
