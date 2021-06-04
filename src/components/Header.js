import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/header.scss';

const Header = ({ title, subtitle, description }) => (
    <div className="header-wrapper">
        <header className="header-title">
            <h1>{title}</h1>
            <h3 className="header-subtitle">{subtitle}</h3>
        </header>
        <div className="header-description" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default Header;