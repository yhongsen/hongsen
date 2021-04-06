/*
Inputs:
    aspectRatios: XXXX
    containerWidth: XXXX
    rowGap: CSS grid row-gap
    rowHeight: CSS grid row-height
Outputs:
    rowSpanList (implicit): List of row-spans for each item
*/
const getMasonryLayout = (aspectRatios, containerWidth, rowGap, rowHeight) => {
    console.log(`RowGap: ${rowGap} and rowHeight: ${rowHeight}`);
    return aspectRatios.map((aspectRatio) => {
        return Math.ceil((aspectRatio * containerWidth + rowGap) / (rowHeight + rowGap));
    });
};

export default getMasonryLayout;

// Removed '+ rowGap' in the numberator to correct extra row being rendered at the bottom of each image