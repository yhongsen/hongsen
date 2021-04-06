import React, { useMemo } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import useResizeObserver from 'use-resize-observer';
import { getBreakPoint, getContentHeight, getContentWidth, getLayoutPosition } from '../utils/masonry';

const Gallery = ({ images }) => {
    const { ref: containerRef, width: containerWidth } = useResizeObserver();

    const defaultColumns = 3;
    const defaultGutter = 20;

    // console.log(containerWidth);

    const { contentWidth, contentHeight, coordinates, maxHeight } = useMemo(() => {
        if (!containerWidth) {
            return { contentWidth: null, contentHeight: null, coordinates: null, maxHeight: 0 };
        }

        const numColumns = getBreakPoint(containerWidth, defaultColumns);
        const { contentWidth, gutter } = getContentWidth(containerWidth, numColumns, defaultGutter);
        const contentHeight = getContentHeight(images, contentWidth);
        const { coordinates, maxHeight } = getLayoutPosition(contentHeight, contentWidth, gutter, numColumns);

        return { contentWidth, contentHeight, coordinates, maxHeight };
    }, [images, containerWidth]);

    return (
        <div ref={containerRef} className="content-container">
            <div className="gallery-wrapper" style={{ height: maxHeight }}>
                {contentWidth && images.map(({ alt, image }, i) => {
                    return (
                        <div
                            key={image.id}
                            style={{
                                position: 'absolute',
                                top: coordinates[i].y,
                                left: coordinates[i].x,
                                width: contentWidth,
                                height: contentHeight[i]
                            }}
                        >
                            <GatsbyImage image={getImage(image)} alt={alt} />
                        </div>
                    );
                })}
            </div>
        </div>
    );

};

export default Gallery;