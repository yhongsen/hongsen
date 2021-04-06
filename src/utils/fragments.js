import { graphql } from "gatsby"

// export const imageFragment = graphql`
//          fragment ImageFragment on ImageSharp {
//            fluid(maxWidth: 1600) {
//              ...GatsbyImageSharpFluid_withWebp_noBase64
//            }
//          }
//        `

export const imageFragment = graphql`
         fragment ImageFragment on ImageSharp {
           gatsbyImageData(
             placeholder: NONE
            )
         }
       `

export const galleryImageFragment = graphql`
         fragment GalleryImageFragment on Yaml {
           alt
           image {
             id
             childImageSharp {
               ...ImageFragment
             }
           }
         }
       `