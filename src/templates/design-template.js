import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Gallery from '../components/Gallery';

const DesignTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    const { title, tags } = { ...page.frontmatter };
    const numColumns = 1;
    // const { previous, next } = pageContext;

    return (
        <div className="content-container">
            <Header title={title} subtitle={tags} description={page.html} />
            <Gallery images={images} columns={numColumns} />
        </div>
    );
}

export default DesignTemplate;

export const pageQuery = graphql`
        query DesignPageBySlug($slug: String!) {
            markdownRemark(frontmatter: { slug: { eq: $slug } }) {
                id
                html
                frontmatter {
                    slug
                    type
                    title
                    tags
                    date(formatString: "MMMM YYYY")
                    photos {
                        childrenYaml {
                        ...GalleryImageFragment
                        }
                    }
                }
            }
        }
    `