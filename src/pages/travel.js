import React from 'react';
import { graphql } from 'gatsby';
import Collection from '../components/Collection';
import Header from '../components/Header';
import SEO from '../components/SEO';

const travelPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;
    const description = "Photos from my trips over the years.";
    const displayHeader = false;

    return (
        <div className="content-container">
            <SEO title={'Travel'} description={description} />
            {displayHeader && <Header title={'Travel'} subtitle={'Collection'} description={description} />}
            <Collection albums={albums} />
        </div>
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
                                ...ImageFragment
                            }
                        }
                    }
                }
            }
        }
    `