import React from 'react'
import { graphql } from "gatsby";
import Gallery from '../components/Gallery';
import SEO from '../components/SEO';
import '../styles/styles.scss';

// import HomePage from '../components/HomePage';

export default function Home({ data }) {
  const images = data.file.childrenYaml; // New graphql search
  // const images = data.allFile.nodes[0].childrenYaml; // Old graphql search
  // console.log(images[0].image.childImageSharp.gatsbyImageData.height);

  return (
    <div className="content-container">
      <SEO />
      <Gallery images={images} />
    </div>
  )
};

// Queries image yaml file in ./content/galleries/home.yaml
// Requires GalleryImageFragment located in ./src/utils/fragments.js
// Query returns 'data' object and is automatically passed into HomePage component
// Reference: https://www.gatsbyjs.com/plugins/gatsby-plugin-image/

// export const pageQuery = graphql`
//          query {
//            allFile(
//              filter: {
//                sourceInstanceName: { eq: "galleries" }
//                name: { eq: "home" }
//              }
//            ) {
//              nodes {
//                childrenYaml {
//                  ...GalleryImageFragment
//                }
//              }
//            }
//          }
//        `

export const pageQuery = graphql`
          query {
            file(absolutePath: {regex: "/home.yaml/"}) {
              childrenYaml {
                ...GalleryImageFragment
              }
            }
          }
        `