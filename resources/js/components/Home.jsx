import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../store';

clickStartBookBok(alertMessage) {
    store.dispatch(fetchAlertMessage(alertMessage));
}

//ホーム画面を表すコンポーネントを定義
export const Home = () => (
    <div>
        <div className="top-wrapper">
            <div className="container">
                <h1>読書を今よりも素敵に。</h1>
                <p>本と感想をまとめて管理できるサービスです。</p>
                <p>他人の書いた感想を読んだり、読書管理をしましょう。</p>

                <div className="register-wrapper mt-5" onClick{(e) => this.clickStartBookBok("BookBokを始める！")}>
                    <Link to="/register" className="btn btn-success">BookBokを始める</Link>
                </div>
            </div>
        </div>

        <div className="services-wrapper">
            <div className="container">
                <div className="service-heading">
                    <h2>BookBokには様々な仕組みがあります</h2>
                </div>

                <div className="services">
                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-4x fa-book" />
                            <p>本棚</p>
                        </div>
                        <p className="service-text">持っている本を本棚で一括管理できます。</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-4x fa-pencil-alt" />
                            <p>レビュー</p>
                        </div>
                        <p className="service-text">読書家さんたちの感想を見ることができます。</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-4x fa-list-ul" />
                            <p>Boks</p>
                        </div>
                        <p className="service-text">本の感想を体系立ててまとめて後で見返すことができます。</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-4x fa-anchor" />
                            <p>読書管理</p>
                        </div>
                        <p className="service-text">本の読書状況やステータスを管理することができます。</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fas fa-4x fa-user-friends" />
                            <p>フォロー</p>
                        </div>
                        <p className="service-text">気になる読書家さん達と繋がりを作ることができます。</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="far fa-4x fa-clock" />
                            <p>Bokフロー</p>
                        </div>
                        <p className="service-text">自分や他人の最近のアクティビティを確認できます。</p>
                    </div>

                    <div className="clear-float-left" />
                </div>
            </div>
        </div>

        <div className="register-wrapper">
            <div className="container">
                <Link to="/register" className="btn btn-success">BookBokを始める</Link>
            </div>
        </div>

    </div>
)

