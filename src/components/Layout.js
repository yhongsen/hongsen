import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Footer from './Footer';

import '../styles/components/layout.scss';

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

// import { mainWrapper, mainContent } from './layout.module.scss';

// const Layout = ({ location, children }) => {
//     return (
//         <div className={mainWrapper}>
//             <Navigation />
//             <main className={mainContent}>{children}</main>
//             <Footer />
//         </div>
//     );
// };

Layout.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
    }),
    children: PropTypes.node.isRequired,
}

export default Layout;