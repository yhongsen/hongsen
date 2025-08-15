import React from 'react';
import PropTypes from 'prop-types';

import { PathContext } from './PathContext';
import Footer from './Footer';
import Navigation from './Navigation';
import '../styles/components/layout.scss';

// Called from gatsby-browser.js and gatsby-ssr.js.
// Destructure props - element passed in becomes props.children
const Layout = ({ location, children }) => {
    const { pathname } = { ...location };

    return (
        <PathContext value={pathname}>
            <div className="main-wrapper">
                <Navigation />
                <main className="main-content">{children}</main>
                <Footer />
            </div>
        </PathContext>
    );
};

Layout.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
};

export default Layout;