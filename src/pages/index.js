import React from 'react'
import { graphql } from 'gatsby';
import Container from '../components/Container';
import Gallery from '../components/Gallery';
import Seo from '../components/SEO';

const home = ({ data }) => {
    const images = data.file.childrenYaml;

    return (
        <Container>
            <Seo />
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