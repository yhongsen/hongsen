import React from 'react';
import { Instagram } from '../components/SocialLinks';

const Footer = () => (
    <footer className="footer">
        <div className="content-container">
            <div className="footer-social">
                <Instagram />
            </div>
            <div className={"footer-copyright"}>
                Copyright Hongsen Yang {new Date().getFullYear()}.
            </div>
        </div>
    </footer>
);

export default Footer;