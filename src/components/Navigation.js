import React from 'react';
import { Link } from 'gatsby';
import Container from './Container';

import '../styles/components/navigation.scss';

const NavLink = ({ path, pathName }) => (
    <Link
        to={path}
        className="navigation-link"
        activeClassName="navigation__active"
        partiallyActive={true}
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
    <Container>
        <div className="navigation-wrapper">

            <Link to="/" className="navigation">
                <h1 className="navigation-header">Hongsen Yang</h1>
            </Link>

            <nav className="navigation-main">
                <span className="navigation-subnav">
                    <NavLink path={"/travel"} pathName={"Travel"} />
                    <div className="navigation-subnav-content">
                        <SubnavLink path={"/travel/japan-2023"} pathName={"Japan III"} />
                        <SubnavLink path={"/travel/japan-2019"} pathName={"Japan II"} />
                        <SubnavLink path={"/travel/japan-2017"} pathName={"Japan I"} />
                        <SubnavLink path={"/travel/china"} pathName={"China"} />
                        <SubnavLink path={"/travel/norcal"} pathName={"NorCal"} />
                        <SubnavLink path={"/travel/socal"} pathName={"SoCal"} />
                        <SubnavLink path={"/travel/nyc"} pathName={"NYC"} />
                        <SubnavLink path={"/travel/washington"} pathName={"Washington"} />
                        <SubnavLink path={"/travel/national-parks"} pathName={"National Parks"} />
                    </div>
                </span>

                <NavLink path={"/portrait"} pathName={"Portrait"} />

                <span className="navigation-subnav">
                    <NavLink path={"/design"} pathName={"Design"} />
                    <div className="navigation-subnav-content">
                        <SubnavLink path={"/design/illustrations"} pathName={"Illustrations"} />
                        <SubnavLink path={"/design/chesscademy"} pathName={"Chesscademy"} />
                        <SubnavLink path={"/design/w2"} pathName={"W2 Innovations"} />
                        <SubnavLink path={"/design/personal-logo"} pathName={"Personal Logo"} />
                    </div>
                </span>

                <NavLink path={"/about"} pathName={"About"} />
                {/*<NavLink path={"/404"} pathName={"Error"} />*/}
            </nav>
        </div>
    </Container>
);

export default Navigation;