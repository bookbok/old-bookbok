import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => (
    <div className="container mt-5">
        <div className="justify-content-center">
            <footer className="d-block">
                <nav>
                    <ul className="d-flex">
                        <li><Link to="/terms_of_service">利用規約</Link></li>
                        <li><Link to="/privacy">プライバシー</Link></li>
                        <li><Link to="#">ヘルプ</Link></li>
                        <li className="mr-auto"><Link to="#">お問い合わせ</Link></li>
                        <li><Link to="#">BookBokとは</Link></li>
                        <li><Link to="/users">ユーザー</Link></li>
                        <li><Link to="#">開発ブログ</Link></li>
                        <li><Link to="#">ご意見</Link></li>
                    </ul>
                </nav>
            </footer>
        </div>
    </div>
)
