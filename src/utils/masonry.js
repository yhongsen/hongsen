import { getImage } from 'gatsby-plugin-image';
import { mobileBreakpoint, desktopBreakpoint } from '../styles/export.module.scss';

/**
 * Calculates the aspect ratios of images.
 * @param {*} images - List of GatsbyImageData images.
 * @returns list of aspect ratios.
 */
const getAspectRatio = (images) => {
    const aspectRatios = images.map(({ image }) => {
        const height = getImage(image).height;
        const width = getImage(image).width;
        const resolution = 1000;
        return Math.ceil(height / width * resolution) / resolution;
    });

    // aspectRatio < 1 === horizontal image
    return aspectRatios;
};

/**
 * Calculates the number of gallery columns based user screen size.
 * @param {int} containerWidth - Size of the gallery container.
 * @param {int} defaultColumns - Default number of columns.
 * @returns number of columns.
 */
const getBreakPoint = (containerWidth, defaultColumns) => {
    if (defaultColumns === 1) {
        return defaultColumns;
    }
    else if (containerWidth < mobileBreakpoint) {
        return 1;
    }
    else if (containerWidth < desktopBreakpoint) {
        return 2;
    }
    else {
        return defaultColumns;
    }
};

/**
 * Calculates the contentHeight of each image based on the contentWidth and aspect ratio.
 * @param {*} images - List of GatsbyImageData images.
 * @param {int} contentWidth - Image width within gallery.
 * @returns list of image height.
 */
const getContentHeight = (images, contentWidth) => {
    const aspectRatios = getAspectRatio(images);
    const contentHeight = aspectRatios.map((aspectRatio) => Math.floor(aspectRatio * contentWidth));
    return contentHeight;
}

/**
 * Calculates the contentWidth for a fixed-width gallery layout. Take the floor of the result to not exceed 
 * containerWidth and avoid float values. 
 * Note: The gutter size is adjusted so that the images span the entire container width.
 * @param {*} containerWidth - Size of the gallery container.
 * @param {int} numColumns - Number of columns in gallery layout.
 * @param {int} defaultGutter - Default gutter size between images.
 * @returns content width and adjusted gutter size.
 */
const getContentWidth = (containerWidth, numColumns, defaultGutter) => {
    const numerator = (containerWidth - (numColumns - 1) * defaultGutter)
    const contentWidth = Math.floor(numerator / numColumns);
    const gutter = numColumns === 1 ? defaultGutter : defaultGutter + ((numerator % numColumns) / (numColumns - 1));
    return { contentWidth, gutter };
};

/**
 * Calculates the coodinates of where each image should be placed in the gallery.
 * @param {*} contentHeight - List of image heights.
 * @param {int} columnWidth - Column width of gallery (fixed).
 * @param {int} gutter - Spacing between images.
 * @param {int} numColumns - Number of columns in gallery layout.
 * @returns list of content coordinates and the max content-container height.
 */
const getLayoutPosition = (contentHeight, columnWidth, gutter, numColumns) => {
    // Keep track of total height in each column
    const columnYPositions = new Array(numColumns).fill(0);

    const coordinates = contentHeight.map((itemHeight) => {
        // Next photo goes into column with lowest total height
        const yPosition = Math.min(...columnYPositions);
        const columnIndex = columnYPositions.indexOf(yPosition);

        // Update total height in columns
        columnYPositions[columnIndex] += itemHeight + gutter;

        return { x: (columnWidth + gutter) * columnIndex, y: yPosition };
    });

    // Max height required to set the content-container div height
    const maxHeight = Math.max(...columnYPositions);

    return { coordinates, maxHeight };
};

/**
 * Gets the loading behavior of the given image. "Eager" load images at the top of the gallery for better 
 * user experience and to reduce 'Largest Contentful Paint.'
 * @param {int} containerWidth - Size of the gallery container.
 * @param {int} i - Image index in the gallery.
 * @returns string "eager" or "lazy" for Gatsby image loading.
 */
const getImageLoadBehavior = (containerWidth, i) => {
    let shouldEagerLoad = false;
    // if (containerWidth < mobileBreakpoint) {
    //     shouldEagerLoad = (i < 3);
    // }
    // else if (containerWidth < desktopBreakpoint) {
    //     shouldEagerLoad = (i < 5);
    // }
    // else {
    //     shouldEagerLoad = (i < 9);
    // }

    // Eager load the first 6 images to reduce use of useResizeObserver
    shouldEagerLoad = i < 6 ? true : false;

    return shouldEagerLoad ? "eager" : "lazy";
}

export { getAspectRatio, getBreakPoint, getContentHeight, getContentWidth, getLayoutPosition, getImageLoadBehavior };