import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Collection = ({ albums }) => {
    return (
        <div className="content-container">
            <div className="collection-wrapper">
                {albums.map(({ frontmatter }) => {
                    const { slug, title, tags, hero } = { ...frontmatter };
                    return (
                        <Link to={slug} key={slug} className="collection-link">
                            <GatsbyImage image={getImage(hero)} alt={title} className="collection-image" />
                            <div className="collection-description">
                                <h2 className="collection-header">{title}</h2>
                                <div className="collection-subheader">{tags}</div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Collection;