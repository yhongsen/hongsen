import React from 'react';
import { graphql } from 'gatsby';
import Collection from '../components/Collection';

const designPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;

    return (
        <Collection albums={albums} />
    );
};

export default designPage;

export const pageQuery = graphql`
        query {
            allMarkdownRemark(
                filter: {frontmatter: {type: {eq: "design"}}}
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