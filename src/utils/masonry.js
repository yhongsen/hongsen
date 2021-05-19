import { getImage } from 'gatsby-plugin-image';

// Returns the GatsbyImage aspect ratio
// aspectRatio < 1 === horizontal image
const getAspectRatio = (images) => {
    const aspectRatios = images.map(({ image }) => {
        const height = getImage(image).height;
        const width = getImage(image).width;
        const resolution = 1000;
        return Math.ceil(height / width * resolution) / resolution;
    });
    return aspectRatios;
};

const getBreakPoint = (containerWidth, defaultColumns) => {
    if (containerWidth < 640) {
        return 1;
    }
    else if (containerWidth < 960) {
        return 2;
    }
    else {
        return defaultColumns;
    }
};

const getContentHeight = (images, contentWidth) => {
    const aspectRatios = getAspectRatio(images);
    const contentHeight = aspectRatios.map((aspectRatio) => Math.floor(aspectRatio * contentWidth));
    return contentHeight;
}

// Returns contentWidth for given containerWidth, numColumns, and gutter size
// floor result to not exceed containerWidth and avoid float values
const getContentWidth = (containerWidth, numColumns, defaultGutter) => {
    const numerator = (containerWidth - (numColumns - 1) * defaultGutter)
    const contentWidth = Math.floor(numerator / numColumns);
    const gutter = numColumns === 1 ? defaultGutter : defaultGutter + ((numerator % numColumns) / (numColumns - 1));
    return { contentWidth, gutter };
};

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


export { getAspectRatio, getBreakPoint, getContentHeight, getContentWidth, getLayoutPosition };