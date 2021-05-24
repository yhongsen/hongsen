import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/Header';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import SEO from '../components/SEO';

const DesignTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    const metaImage = page.frontmatter.hero.childImageSharp.original;
    const { title, subtitle } = { ...page.frontmatter };
    const numColumns = 1;
    // const { previous, next } = pageContext;

    return (
        <div className="content-container">
            <SEO title={title} description={page.excerpt} image={metaImage} />
            <Header title={title} subtitle={subtitle} description={page.html} />
            <Gallery images={images} columns={numColumns} />
            <Button buttonText={"Back to Collection"} path={"/design"} />
        </div>
    );
}

export default DesignTemplate;

export const pageQuery = graphql`
        query DesignPageBySlug($slug: String!) {
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