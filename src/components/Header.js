import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/header.scss';
import { Link } from 'gatsby';

const Header = ({ title, subtitle, description, subAlbumSlugs, subAlbumNames}) => (
        <div className="header-wrapper">
            <header className="header-title">
                <h1>{title}</h1>
                <h3 className="header-subtitle">{subtitle}</h3>
            </header>
            <div className="header-description" dangerouslySetInnerHTML={{ __html: description }} />           
            <div>
                {subAlbumSlugs && subAlbumSlugs.map((link, idx) => {
                    return (
                        <Link
                            to={link}
                            className="navigation-subalbum-link"
                            activeClassName="navigation__active"
                            key={idx}
                        >
                            {subAlbumNames[idx]}
                        </Link>
                    )
                })}
            </div>
        </div>
);

Header.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    description: PropTypes.string,
};

export default Header;