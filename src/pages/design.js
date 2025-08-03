import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import Collection from '../components/Collection';
import Container from '../components/Container';
import Header from '../components/Header';
import Seo from '../components/SEO';

const designPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;
    const description = "A collection of freelance and personal design projects I've worked on.";
    const displayHeader = false;

    // Set metaImage to most recent collection.
    const metaImage = albums.length ? albums[0].frontmatter.hero.childImageSharp.original : undefined;

    return (
        <Container>
            <Seo title={'Design'} description={description} image={metaImage}/>
            {displayHeader && <Header title={'Design'} subtitle={'Collection'} description={description} />}
            <Collection albums={albums} />
        </Container>
    );
};

designPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object),
        }),
    }),
};

export default designPage;

export const pageQuery = graphql`
        query {
            allMarkdownRemark(
                filter: {fields: {type: {eq: "design"}}}
                sort: {fields: frontmatter___date, order: DESC}
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        subtitle
                        date(formatString: "YYYY-MM")
                        hero {
                            id
                            childImageSharp {
                                ...ImageFragment_2
                            }
                        }
                    }
                }
            }
        }
    `