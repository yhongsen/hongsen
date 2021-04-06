import React from 'react';
import { graphql } from 'gatsby';
import Gallery from '../components/Gallery';

const GalleryTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    // const { previous, next } = pageContext;

    return (
        <Gallery images={images} />
    );
}

export default GalleryTemplate;

export const pageQuery = graphql`
        query GalleryPageBySlug($slug: String!) {
            markdownRemark(frontmatter: { slug: { eq: $slug } }) {
                id
                html
                frontmatter {
                    slug
                    type
                    title
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