import React from 'react';
import Container from './Container';
import { Instagram } from './SocialLinks';

import '../styles/components/footer.scss';

const Footer = () => (
    <footer className="footer">
        <Container>
            <div className="footer-social">
                <Instagram />
            </div>
            <div className={"footer-copyright"}>
                Copyright Hongsen Yang {new Date().getFullYear()}.
            </div>
        </Container>
    </footer>
);

export default Footer;