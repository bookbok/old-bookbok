import React, { Component } from 'react';
import { ConnectedUserInfo } from "../containers";

//マイページ画面を表すコンポーネントを定義
export const Mypage = () => (
    <div>
        <h1>マイページ</h1>
        <ConnectedUserInfo />
    </div>
)

