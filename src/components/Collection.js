import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';

const Collection = ({ albums }) => {
    return (
        <div className="collection-wrapper">
            {albums.map(({ frontmatter }) => {
                const { slug, title, subtitle, hero } = { ...frontmatter };
                return (
                    <Link to={slug} key={slug} className="collection-link">
                        <GatsbyImage image={getImage(hero)} alt={title} className="collection-image" />
                        <div className="collection-description">
                            <h2 className="collection-header">{title}</h2>
                            <div className="collection-subheader">{subtitle}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

Collection.propTypes = {
    albums: PropTypes.arrayOf(
        PropTypes.shape({
            frontmatter: PropTypes.shape({
                slug: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                subtitle: PropTypes.string.isRequired,
                hero: PropTypes.object.isRequired,
            }),
        }).isRequired,
    ).isRequired,
};

export default Collection;