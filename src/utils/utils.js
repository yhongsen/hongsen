/**
 * Get's the first image's image data in the list of images that is a horizontal image.
 * This image will be used for the metadata image tags when sharing on social media,
 * which generally displays in a horizontal format.
 *
 * @param {List[object]} images - list of objects that contain info about
 * each images' image src, height, and width. Used for metadata images
 * @returns object containing src, height, and width attributes
 */
const getMetaImage = (images) => {
    const firstHorizontalImage = images.find(({ image }) => {
        const { height, width } = image.childImageSharp.original
        return width >= height;
    });
    return (
        firstHorizontalImage && firstHorizontalImage.image.childImageSharp.original
    );
};

export { getMetaImage };