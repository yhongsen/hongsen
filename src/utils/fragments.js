import { graphql } from "gatsby"

/**
 * By default, Gatsby loads images based on the viewport width. Use the "sizes" property to suguest 
 * to the browser to load smaller images that won't span the full width. This will greatly reduce 
 * gallery load times.
 * 
 * Min-Width: (Note: Set image slightly larger than max width)
 * Desktop: 960px + 160px padding -> 3-column images range from 306px to 353px in width
 * Tablet: 640px + 80px padding -> 2-column images range from 310px to 469px in width
 * Mobile: anything under 640px + 80px padding
 * 
 * Relevant Links:
 * https://alexasteinbruck.medium.com/understanding-gatsby-image-part-3-controlling-sizes-breakpoints-and-styling-dfe92d0d10f4
 * https://www.gatsbyjs.com/blog/meet-new-gatsby-image/
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes
 */
export const imageFragment_3 = graphql`
        fragment ImageFragment_3 on ImageSharp {
            gatsbyImageData(
                sizes: "(min-width: 1120px) 400px, (min-width: 720px) and (max-width: 1120px) 50vw, (max-width: 720px) 100vw"
                placeholder: NONE
            )
        }
    `

export const imageFragment_2 = graphql`
        fragment ImageFragment_2 on ImageSharp {
            gatsbyImageData(
                sizes: "(min-width: 1120px) 800px, (min-width: 720px) and (max-width: 1120px) 50vw, (max-width: 720px) 100vw"
                placeholder: NONE
            )
        }
    `

export const imageFragment_1 = graphql`
        fragment ImageFragment_1 on ImageSharp {
            gatsbyImageData(
                sizes: "(min-width: 1120px) 1200px, (max-width: 1120px) 100vw"
                placeholder: NONE
            )
        }
    `

export const metaImageFragment = graphql`
        fragment MetaImageFragment on ImageSharp {
            original {
                src
                height
                width
            }
        }
    `
