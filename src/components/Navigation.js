import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';

import Container from './Container';
import '../styles/components/navigation.scss';

const { sortPagesByType, getSubAlbums } = require(`../utils/albums`);


const NavItem = ({ path, pathName, children }) => {
    const listClassName = children ? "navigation-dropdown" : "";

    return (
        <li className={listClassName}>
            <Link
                to={path}
                className="navigation-main__link"
                activeClassName="navigation__active"
                partiallyActive={true}
            >
                {pathName}
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

const DropdownItem = ({ path, pathName, children }) => {
    const listClassName = children ? "navigation-submenu" : "";

    return (
        <li className={listClassName}>
            <Link
                to={path}
                className="navigation-dropdown__link"
                activeClassName="navigation__active"
                partiallyActive={true}
            >
                {pathName}
            </Link>

            {
                // Render submenu & submenu items if children exist
                children && (
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
const renderDropdownItems = (albumPages) => (
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
            <DropdownItem path={slug} pathName={title} key={idx}>
            {
                subAblums.map((subAlbum, idx) => (
                    <SubmenuItem path={subAlbum.slug} pathName={subAlbum.title} key={idx} />
                ))
            }
            </DropdownItem>
        )
    })
);

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
            <div className="navigation-wrapper">
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
                            {renderDropdownItems(pagesByType.get("travel"))}
                        </NavItem>

                        <NavItem path={"/about"} pathName={"About"} />

                    </ul>
                </nav>
            </div>
        </Container>
    );
};

export default Navigation;