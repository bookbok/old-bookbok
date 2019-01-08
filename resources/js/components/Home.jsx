import React, { Component } from 'react';

//ホーム画面を表すコンポーネントを定義
export const Home = () => (
    <div>
        <div className="top-wrapper">
            <div className="container">
                <h1>読書を今よりも素敵に。</h1>
                <p>本と感想をまとめて管理できるサービスです。</p>
                <p>他人の書いた感想を読んだり、読書管理をしましょう。</p>
            </div>
        </div>

        <div className="services-wrapper">
            <div className="container">
                <div className="services">

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fa fa-4x fa-tags" />
                            <p>本棚</p>
                        </div>
                        <p>持っている本を本棚で一括管理</p>
                    </div>

                    <div className="service-box">
                        <div className="service-icon">
                            <i className="fa fa-4x fa-tags" />
                            <p>本棚</p>
                        </div>
                        <p>持っている本を本棚で一括管理</p>
                    </div>

                    <div className="clear-float-left" />
                </div>
            </div>
        </div>

    </div>
)

