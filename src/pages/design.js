import React from 'react';
import { graphql } from 'gatsby';
import Collection from '../components/Collection';
import Header from '../components/Header';
import SEO from '../components/SEO';

const designPage = ({ data }) => {
    const albums = data.allMarkdownRemark.nodes;
    const description = "A collection of freelance and personal design projects I've worked on.";
    const displayHeader = false;

    return (
        <div className="content-container">
            <SEO title={'Design'} description={description} />
            {displayHeader && <Header title={'Design'} subtitle={'Collection'} description={description} />}
            <Collection albums={albums} />
        </div>
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