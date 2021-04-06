import React from 'react';
import { Link } from 'gatsby';

const Navigation = () => (
    <div className="content-container">
        <div className="navigation-wrapper">

            <Link to="/" className="navigation">
                <h1 className="navigation-header">Hongsen Yang</h1>
            </Link>

            <nav className="navigation-main">
                <span className="navigation-subnav">
                    <div className="navigation-link">Travel</div>
                    <div className="navigation-subnav-content">
                        <Link
                            to="/travel/japan-2019"
                            className="navigation-subnav-link"
                            activeClassName="navigation__active"
                        >
                            Japan II
                        </Link>
                        <Link
                            to="/travel/japan-2017"
                            className="navigation-subnav-link"
                            activeClassName="navigation__active"
                        >
                            Japan I
                        </Link>
                        <div className="navigation-subnav-link">Yosemite</div>
                    </div>
                </span>

                <Link
                    to="/portrait"
                    className="navigation-link"
                    activeClassName="navigation__active"
                >
                    Portrait
                </Link>
                <Link
                    to="/design"
                    className="navigation-link"
                    activeClassName="navigation__active"
                >
                    Design
                </Link>
                <Link
                    to="/about"
                    className="navigation-link"
                    activeClassName="navigation__active"
                >
                    About
                </Link>
            </nav>
        </div>
    </div>
);

export default Navigation;