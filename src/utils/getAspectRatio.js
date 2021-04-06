// Returns the GatsbyImage aspect ratio
// aspectRatio < 1 === horizontal image
const getAspectRatio = (images) => {
    const aspectRatio = images.map(({ image }) => {
        const height = image.childImageSharp.gatsbyImageData.height;
        const width = image.childImageSharp.gatsbyImageData.width;
        const resolution = 1000;
        return Math.ceil(height / width * resolution) / resolution;
    });
    return aspectRatio;
};
export default getAspectRatio;