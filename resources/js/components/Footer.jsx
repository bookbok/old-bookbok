import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => (
    <div className="container mt-5">
        <div className="justify-content-center">
            <footer className="d-inline">
                <nav>
                    <ul className="d-flex">
                        <div className="d-md-flex">
                            <li><Link to="/terms_of_service">利用規約</Link></li>
                            <li><Link to="/privacy">プライバシー</Link></li>
                            <li><Link to="#"><del>ヘルプ</del></Link></li>
                            <li><Link to="#"><del>お問い合わせ</del></Link></li>
                        </div>
                        <div className="d-md-flex ml-auto pr-5">
                            <li><Link to="#"><del>BookBokとは</del></Link></li>
                            <li><Link to="/users">ユーザー</Link></li>
                            <li><Link to="#"><del>開発ブログ</del></Link></li>
                            <li><Link to="#"><del>ご意見</del></Link></li>
                        </div>
                    </ul>
                </nav>
            </footer>
        </div>
    </div>
)
