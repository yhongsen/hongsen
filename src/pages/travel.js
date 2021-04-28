import React from 'react';
import { graphql } from 'gatsby';
import Collection from '../components/Collection';

const travelPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;

    return (
        <Collection albums={albums} />
    );
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
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }
    `