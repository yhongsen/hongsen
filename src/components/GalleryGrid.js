import React, { useMemo } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useResizeObserver from 'use-resize-observer';
import getAspectRatio from '../utils/getAspectRatio';
import getMasonryLayout from '../utils/getMasonryLayout';

const { useRef } = React;

const GalleryGrid = ({ images }) => {
    const { ref: containerRefDummy, width: widthDummy } = useResizeObserver();
    const { ref: containerRef, width } = useResizeObserver();
    const gridRef = useRef();
    console.log(width);
    console.log(gridRef.current);
    // const computed = window.getComputedStyle(gridRef.current).getPropertyValue('row-gap');
    // const computed = window.getComputedStyle(gridRef.current).getPropertyValue('row-gap');
    // console.log(computed);


    // useMemo - will only recompute the memoized value when one of the dependencies has changed.
    // avoid expensive calculations on every render --> OPTIMIZATION
    // const aspectRatios = getAspectRatio(images);
    // const containerWidth = width;
    // const rowGap = 10;
    // const rowHeight = 10;
    // const rowSpanList = getMasonryLayout(aspectRatios, containerWidth, rowGap, rowHeight);

    const rowSpanList = useMemo(() => {
        if (!width && !widthDummy) {
            return null;
        }
        const aspectRatios = getAspectRatio(images);
        const containerWidth = width ? width : widthDummy;
        const rowGap = parseInt(window.getComputedStyle(gridRef.current).getPropertyValue('row-gap'), 10);
        const rowHeight = parseInt(window.getComputedStyle(gridRef.current).getPropertyValue('grid-auto-rows'), 10);
        return getMasonryLayout(aspectRatios, containerWidth, rowGap, rowHeight);
    }, [images, width, widthDummy]);

    console.log(rowSpanList);

    return (
        <div ref={gridRef} className="content-container gallery-masonry">
            {!width && <div ref={containerRefDummy} />}
            {rowSpanList && images.map(({ alt, image }, i) => {
                return (
                    <div
                        ref={containerRef}
                        key={image.id}
                        style={{
                            gridRowEnd: `span ${rowSpanList[i]}`,
                        }}
                    >
                        <GatsbyImage image={getImage(image)} alt={alt} />
                    </div>
                );
            })}
        </div>
    );
};


// Image size = (content-container_width - 2*padding - 2*grid-column-gap) / 3 images
// How to find break points for reducing number of columns?
// Can calculate picture dimensions if can track the current container width set in content-container

// Need helper functions to getRowGap and getRowHeight from the css files
// Need helper function to getBoundingBox/pictureDim -- see getBoundingClientRect

// grid-template-columns: repeat(auto-fill, minmax(200px, fr)) = sets columns to whatever fits best between 200 px and 1fr
// fr = flex

export default GalleryGrid;