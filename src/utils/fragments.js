import { graphql } from "gatsby"

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