import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => (
    <footer className="container mt-5">
        <nav>
            <ul className="footer-list justify-content-center text-center">
            {/* <li className="footer-list-item"><Link to="#"><del>BookBokとは</del></Link></li> */}
                <li className="footer-list-item"><Link to="/terms_of_service">利用規約</Link></li>
                <li className="footer-list-item"><Link to="/privacy">プライバシー</Link></li>
                <li className="footer-list-item"><Link to="/tutorial/0">チュートリアル</Link></li>
                <li className="footer-list-item"><Link to="/users">ユーザー</Link></li>
                <li className="footer-list-item"><a href="https://goo.gl/forms/Ig6K1ieesR4dY7cg1" target="_blank">ご意見</a></li>
            </ul>
        </nav>
    </footer>
);

export default Footer;
