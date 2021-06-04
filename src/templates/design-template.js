import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Container from '../components/Container';
import Gallery from '../components/Gallery';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { getMetaImage } from '../utils/utils';

const DesignTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    const metaImage = getMetaImage(images);
    const { title, subtitle } = { ...page.frontmatter };
    const numColumns = 1;
    // const { previous, next } = pageContext;

    return (
        <Container>
            <SEO title={title} description={page.excerpt} image={metaImage} />
            <Header title={title} subtitle={subtitle} description={page.html} />
            <Gallery images={images} columns={numColumns} />
            <Button buttonText={"Back to Collection"} path={"/design"} />
        </Container>
    );
}

DesignTemplate.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            html: PropTypes.string,
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
                slug: PropTypes.string,
                type: PropTypes.string,
                title: PropTypes.string,
                subtitle: PropTypes.string,
                date: PropTypes.string,
                photos: PropTypes.shape({
                    childrenYaml: PropTypes.array,
                }),
            }),
        }),
    }).isRequired,
    pageContext: PropTypes.object
};

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
                    photos {
                        childrenYaml {
                            ...GalleryImageFragment
                        }
                    }
                }
            }
        }
    `