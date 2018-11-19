import React from 'react';
import { Link } from "react-router-dom";

export const Footer = () => (
    <div class="container mt-5">
        <div class="justify-content-center">
            <footer class="d-none d-md-block">
                <nav>
                    <ul class="d-flex">
                        <li><Link to="#">利用規約</Link></li>
                        <li><Link to="#">プライバシー</Link></li>
                        <li><Link to="#">ヘルプ</Link></li>
                        <li class="mr-auto"><Link to="#">お問い合わせ</Link></li>
                        <li><Link to="#">BookBokとは</Link></li>
                        <li><Link to="#">ユーザー</Link></li>
                        <li><Link to="#">開発ブログ</Link></li>
                        <li><Link to="#">ご意見</Link></li>
                    </ul>
                </nav>
            </footer>
        </div>
    </div>
)
