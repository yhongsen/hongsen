import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

import { getMetaImage } from '../utils/utils';
import { GalleryButtons } from '../components/Button';
import Container from '../components/Container';
import Gallery from '../components/Gallery';
import Header from '../components/Header';
import Seo from '../components/SEO';

const DesignTemplate = ({ data, pageContext }) => {
    const page = data.markdownRemark;
    const images = page.frontmatter.photos ? page.frontmatter.photos.childrenYaml : [];
    const metaImage = getMetaImage(images);
    const { title, subtitle } = { ...page.frontmatter };
    const { subAlbum, type } = pageContext;
    const numColumns = 1;
    // const { previous, next } = pageContext;

    return (
        <Container>
            <Seo title={title} description={page.excerpt} image={metaImage} />
            <Header title={title} subtitle={subtitle} description={page.html} subAlbum={subAlbum} />
            <Gallery images={images} columns={numColumns} />
            <GalleryButtons renderButton={!!title} type={type} />
        </Container>
    );
};

DesignTemplate.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            html: PropTypes.string,
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
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
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            excerpt(pruneLength: 160)
            frontmatter {
                title
                subtitle
                date(formatString: "MMMM YYYY")
                photos {
                    childrenYaml {
                        alt
                        image {
                            id
                            childImageSharp {
                                ...ImageFragment_1
                                ...MetaImageFragment
                            }
                        }
                    }
                }
            }
        }
    }
`;