import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import SEO from '../components/SEO';

const GalleryTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    const metaImage = page.frontmatter.hero.childImageSharp.original;
    const { title, subtitle, type } = { ...page.frontmatter };
    // const { previous, next } = pageContext;

    return (
        <div className="content-container">
            <SEO title={title} description={page.excerpt} image={metaImage} />
            {!!title && <Header title={title} subtitle={subtitle} description={page.html} />}
            <Gallery images={images} />
            {!!title && <Button buttonText={"Back to Collection"} path={`/${type}`} />}
        </div>
    );
}

export default GalleryTemplate;

export const pageQuery = graphql`
        query GalleryPageBySlug($slug: String!) {
            markdownRemark(frontmatter: { slug: { eq: $slug } }) {
                html
                excerpt(pruneLength: 160)
                frontmatter {
                    slug
                    type
                    title
                    subtitle
                    date(formatString: "MMMM YYYY")
                    hero {
                        childImageSharp {
                            ...MetaImageFragment
                        }
                    }
                    photos {
                        childrenYaml {
                            ...GalleryImageFragment
                        }
                    }
                }
            }
        }
    `