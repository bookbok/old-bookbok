import React, { Component } from 'react';
import { ConnectedUserInfo } from "../containers.js";

//マイページ画面を表すコンポーネントを定義
export const Mypage = () => (
    <div>
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div class="p-3">
                        
                        {/*タブのボタン部分*/}
                        <ul class="nav nav-tabs">
                            <li class="nav-item">
                                <a href="#top" class="nav-link active" data-toggle="tab">トップ</a>
                            </li>
                            <li class="nav-item">
                                <a href="#user_books" class="nav-link" data-toggle="tab">本棚</a>
                            </li>
                            <li class="nav-item">
                                <a href="#likes" class="nav-link" data-toggle="tab">LIKE</a>
                            </li>
                            <li class="nav-item">
                                <a href="#loves" class="nav-link" data-toggle="tab">LOVE</a>
                            </li>
                        </ul>

                        {/*タブのコンテンツ部分*/}
                        <div class="tab-content">
                            <div id="top" class="tab-pane active">
                                トップ
                            </div>
                            <div id="user_books" class="tab-pane">
                                本棚
                            </div>
                            <div id="likes" class="tab-pane">
                                LIKE
                            </div>
                            <div id="loves" class="tab-pane">
                                LOVE
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

