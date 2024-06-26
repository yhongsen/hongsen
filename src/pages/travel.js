import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Collection from '../components/Collection';
import Container from '../components/Container';
import Header from '../components/Header';
import Seo from '../components/SEO';

const travelPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;
    const description = "A collection of travel photos from my trips from over the years.";
    const displayHeader = false;

    // Set metaImage to most recent collection.
    const metaImage = albums.length ? albums[0].frontmatter.hero.childImageSharp.original : undefined;

    return (
        <Container>
            <Seo title={'Travel'} description={description} image={metaImage} />
            {displayHeader && <Header title={'Travel'} subtitle={'Collection'} description={description} />}
            <Collection albums={albums} />
        </Container>
    );
};

travelPage.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.object),
        }),
    }),
};

export default travelPage;

export const pageQuery = graphql`
        query {
            allMarkdownRemark(
                filter: {frontmatter: {type: {eq: "travel"}}}
                sort: {fields: frontmatter___order, order: ASC}
            ) {
                nodes {
                    frontmatter {
                        slug
                        title
                        subtitle
                        date(formatString: "YYYY-MM")
                        order
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