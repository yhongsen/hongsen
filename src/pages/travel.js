import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Collection from '../components/Collection';
import Container from '../components/Container';
import Header from '../components/Header';
import Seo from '../components/SEO';

const travelPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;
    const description = "Photos from my trips over the years.";
    const displayHeader = false;

    return (
        <Container>
            <Seo title={'Travel'} description={description} />
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
                sort: {fields: frontmatter___date, order: DESC}
            ) {
                nodes {
                    frontmatter {
                        slug
                        title
                        subtitle
                        date(formatString: "YYYY-MM")
                        hero {
                            id
                            childImageSharp {
                                ...ImageFragment
                            }
                        }
                    }
                }
            }
        }
    `