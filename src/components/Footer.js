import React from 'react';
import SocialLinks from '../components/SocialLinks';

const Footer = () => (
    <footer className="footer">
        <div className="content-container">
            <div className="footer-social">
                <SocialLinks />
            </div>
            <div className={"footer-copyright"}>
                Copyright Hongsen Yang {new Date().getFullYear()}.
            </div>
        </div>
    </footer>
);

export default Footer;