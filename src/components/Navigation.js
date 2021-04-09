import React from 'react';
import { Link } from 'gatsby';

const NavLink = ({ path, pathName }) => (
    <Link
        to={path}
        className="navigation-link"
        activeClassName="navigation__active"
    >
        {pathName}
    </Link>
);

const SubnavLink = ({ path, pathName }) => (
    <Link
        to={path}
        className="navigation-subnav-link"
        activeClassName="navigation__active"
    >
        {pathName}
    </Link>
);

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
                        <SubnavLink path={"/travel/japan-2019"} pathName={"Japan II"} />
                        <SubnavLink path={"/travel/japan-2017"} pathName={"Japan I"} />
                        <SubnavLink path={"/travel/yosemite"} pathName={"Yosemite"} />
                        <SubnavLink path={"/travel/colorado"} pathName={"Colorado"} />
                        <SubnavLink path={"/travel/acadia"} pathName={"Acadia"} />
                        <SubnavLink path={"/travel/china"} pathName={"China"} />
                        <SubnavLink path={"/travel/utah-arizona"} pathName={"Utah & Arizona"} />
                    </div>
                </span>

                <NavLink path={"/portrait"} pathName={"Portrait"} />

                <span className="navigation-subnav">
                    <div className="navigation-link">Design</div>
                    <div className="navigation-subnav-content">
                        <SubnavLink path={"/design/illustrations"} pathName={"Illustrations"} />
                        <SubnavLink path={"/design/chesscademy"} pathName={"Chesscademy"} />
                        <SubnavLink path={"/design/w2"} pathName={"W2 Innovations"} />
                        <SubnavLink path={"/design/personal-logo"} pathName={"Personal Logo"} />
                    </div>
                </span>

                <NavLink path={"/about"} pathName={"About"} />
            </nav>
        </div>
    </div>
);

export default Navigation;