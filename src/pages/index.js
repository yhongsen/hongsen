import React from 'react'
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Gallery from '../components/Gallery';
import Seo from '../components/SEO';
import { getMetaImage } from '../utils/utils';

const home = ({ data }) => {
    const images = data.file.childrenYaml;
    const metaImage = getMetaImage(images);

    return (
        <Container>
            <Seo image={metaImage}/>
            <Gallery images={images} />
        </Container>
    )
};

export default home;

// Queries image yaml file in ./content/galleries/home.yaml
// Requires GalleryImageFragment located in ./src/utils/fragments.js
// Query returns 'data' object and is automatically passed into HomePage component
// Reference: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/

export const pageQuery = graphql`
        query {
            file(absolutePath: {regex: "/home.yaml/"}) {
                childrenYaml {
                    ...GalleryImageFragment
                }
            }
        }
    `