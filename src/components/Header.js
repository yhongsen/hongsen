import React from 'react';

const Header = ({ title, subtitle, description }) => (
    <div className="header-wrapper">
        <header className="header-title">
            <h1>{title}</h1>
            <h3 className="header-subtitle">{subtitle}</h3>
        </header>
        <div className="header-description" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
);

export default Header;