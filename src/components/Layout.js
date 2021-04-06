import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

// Destructure props - element passed in becomes props.children
const Layout = ({ location, children }) => {
    return (
        <div className="main-wrapper">
            <Navigation />
            <main className="main-content">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;