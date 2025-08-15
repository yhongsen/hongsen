import React, { useState, useEffect, useContext } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import { PathContext } from './PathContext';
import Container from './Container';
import Logo from "../../content/assets/logo.svg"
import Hamburger from "../../content/assets/hamburger.svg"
import Cross from "../../content/assets/cross.svg"
import '../styles/components/navigation.scss';

const { sortPagesByType, getSubAlbums } = require(`../utils/albums`);

/**
 * Helper function to determine if a nav link is partially active to conditionally
 * style elements. Note: Gatsby <Link> component has 'isPartiallyActive' built into it.
 * 
 * Example: currentPath = /travel/japan/japan-2017
 *          navPath = /travel and /travel/japan will return true
 * 
 * @param {string} navPath - The navigation menu path
 * @param {string} currentPath - The path of the current page
 * @returns true if the navPath is an exact or partial match of the currentPath, else
 * returns false
 */
const isActive = (navPath, currentPath) => {
    return currentPath.includes(navPath);
}

const NavItem = ({ path, pathName, isMobile = false, callbackFn, children }) => {
    const listClassName = children ? "navigation-dropdown" : "";
    const arrowClassName = isMobile ? "arrow__right arrow__dropdown" : "arrow__down arrow__mainnav";

    const currentPath = useContext(PathContext);
    const arrowIsActive = isActive(path, currentPath) ? "arrow__active" : "";

    return (
        <li className={listClassName}>
            <Link
                to={path}
                className="navigation-main__link"
                activeClassName="navigation__active"
                partiallyActive={true}
                onClick={callbackFn}
            >
                {pathName}
                {children && (
                    <span className={`arrow ${arrowClassName} ${arrowIsActive}`} />
                )}
            </Link>
            
            {
                // Render dropdown & dropdown items if children exist
                children && (
                    <ul className="navigation-dropdown__list">
                        {children}
                    </ul>
                )
            }
        </li>
    );
};

const DropdownItem = ({ path, pathName, isMobile = false, children }) => {
    const hasChildren = children.length > 0;
    const listClassName = hasChildren ? "navigation-submenu" : "";

    const currentPath = useContext(PathContext);
    const arrowIsActive = isActive(path, currentPath) ? "arrow__active" : "";

    return (
        <li className={listClassName}>
            <Link
                to={path}
                className="navigation-dropdown__link"
                activeClassName="navigation__active"
                partiallyActive={true}
            >
                {pathName}
                {!isMobile && hasChildren && (
                    <span className={`arrow arrow__right arrow__dropdown ${arrowIsActive}`}/>
                )}
            </Link>

            {
                // Render submenu & submenu items if children exist
                hasChildren && (
                    <ul className="navigation-submenu__list">
                        {children}
                    </ul>
                )
            }
        </li>
    );
};

const SubmenuItem = ({ path, pathName }) => (
    <li>
        <Link 
            to={path} 
            className="navigation-submenu__link"
            activeClassName="navigation__active"
        >
            {pathName}
        </Link>
    </li>
);

/**
 * A helper function to convert the albumPages map into an array in order to render DropdownItems
 * and SubmenuItems in the Navigation component.
 * 
 * @param {Map[parentAlbum][object]} albumPages - a map where the key is the parentAlbum and the
 * value is an object containing title, slug, and subAlbum attributes of the parentAlbum.
 * @returns a DropdownItem and any associated sub-albums.
 */
const renderDropdownItems = (albumPages, isMobile = false) => (
    /**
     * Convert map to an array to use the .map() iteration method.
     * Note: A map doesn't have the .map() method. The .foreach() method can't be used since it
     * doesn't return anything.
     */
    Array.from(albumPages, ([key, value]) => value).map((parentAlbum, idx) => {
        const { title, slug } = { ...parentAlbum };
        const subAblums = getSubAlbums(parentAlbum);

        // Render DropdownItem and sub-albums if they exist.
        return (
            <DropdownItem path={slug} pathName={title} isMobile={isMobile} key={idx}>
            {
                !isMobile && subAblums.map((subAlbum, idx) => (
                    <SubmenuItem path={subAlbum.slug} pathName={subAlbum.title} key={idx} />
                ))
            }
            </DropdownItem>
        )
    })
);

const NavDesktop = (pagesByType) => (
    <div className="navigation-wrapper__desktop">
        <Link to="/" className="navigation">
            <h1 className="navigation-header">Hongsen Yang</h1>
        </Link>

        <nav className="navigation-main">
            <ul className="navigation-main__list">

                <NavItem path={"/travel"} pathName={"Travel"}>
                    {renderDropdownItems(pagesByType.get("travel"))}
                </NavItem>

                <NavItem path={"/portrait"} pathName={"Portrait"} />

                <NavItem path={"/design"} pathName={"Design"}>
                    {renderDropdownItems(pagesByType.get("design"))}
                </NavItem>

                <NavItem path={"/about"} pathName={"About"} />

            </ul>
        </nav>
    </div>
);

const NavMobile = (pagesByType) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // prevent scrolling when mobile nav is open
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
    }, [isOpen]);

    return (
        <div className="navigation-wrapper__mobile">
            <nav className="navigation-main navigation-mobile">
                
                <div className="navigation-mobile-bar">
                    <Link to="/" onClick={() => setIsOpen(false)}>
                        <Logo className="logo" alt="logo" />
                    </Link>
                    <button className="navigation-mobile-menu__button" onClick={toggleMenu}>
                        {!isOpen ? (
                            <Hamburger className="icon" alt="menu" />
                        ) : (
                            <Cross className="icon" alt="close menu" />
                        )}
                    </button>
                </div>

                <div className={`navigation-mobile-menu ${isOpen ? "navigation-mobile-menu__open" : ""}`}>
                    <ul className="navigation-mobile-menu__list">
                        <NavItem path={"/travel"} pathName={"Travel"} isMobile={true} callbackFn={toggleMenu}>
                            {renderDropdownItems(pagesByType.get("travel"), true)}
                        </NavItem>

                        <NavItem path={"/portrait"} pathName={"Portrait"} isMobile={true} callbackFn={toggleMenu} />

                        <NavItem path={"/design"} pathName={"Design"} isMobile={true} callbackFn={toggleMenu}>
                            {renderDropdownItems(pagesByType.get("design"), true)}
                        </NavItem>

                        <NavItem path={"/about"} pathName={"About"} isMobile={true} callbackFn={toggleMenu} />
                    
                    </ul>
                </div>

            </nav>
        </div>
    );
};

const Navigation = () => {

    const data = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark(
                    sort: {fields: [frontmatter___order, frontmatter___date], order: [ASC, ASC]}
                ) {
                    nodes {
                        fields {
                            slug
                            type
                            isSubAlbum
                        }
                        frontmatter {
                            title
                            subAlbumTitle
                        }
                    }
                }
            }
        `
    );

    const pages = data.allMarkdownRemark.nodes;
    const pagesByType = sortPagesByType(pages);

    return (
        <Container>
            {NavDesktop(pagesByType)}
            {NavMobile(pagesByType)}
        </Container>
    );
};

export default Navigation;