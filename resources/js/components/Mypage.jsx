import React, { Component } from 'react';
import { ConnectedUserInfo } from "../containers.js";

//マイページ画面を表すコンポーネントを定義
export const Mypage = () => (
    <div>
        <h1>マイページ</h1>
    
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <a class="nav-link active">トップ</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">本棚</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">フォロー</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">フォロワー</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">LIKE</a>
            </li>
            <li class="nav-item">
                <a class="nav-link">LOVE</a>
            </li>
        </ul>
    </div>
)

