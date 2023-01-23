import React, { useMemo } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import useResizeObserver from 'use-resize-observer';
import { getBreakPoint, getContentHeight, getContentWidth, getLayoutPosition, getImageLoadBehavior } from '../utils/masonry';

import { darkGrey, offWhite } from '../styles/export.module.scss';
import '../styles/components/gallery.scss';

/**
 * NOTE: When the lightbox is activated, simple-react-lightbox (v3.6.6) hides the scroll bar and adds
 * adds 17 px margin-right to the body. It is incorrectly implemented on browsers that have the scrollbar 
 * shown by default as the "fix" only works on the first time the lightbox is opened. See issue:
 * https://github.com/michelecocuccio/simple-react-lightbox/issues/113.
 * 
 * To fix this page shift issue, apply 'margin = 0 !important' and 'overflow-y: scroll' in _base.scss.
*/
const Gallery = ({ images, columns }) => {
    const { ref: containerRef, width: containerWidth } = useResizeObserver();

    const defaultColumns = !!columns ? columns : 3;
    const defaultGutter = 20;

    const { contentWidth, contentHeight, coordinates, maxHeight } = useMemo(() => {
        if (!containerWidth) {
            return { contentWidth: null, contentHeight: null, coordinates: null, maxHeight: 0 };
        };

        const numColumns = getBreakPoint(containerWidth, defaultColumns);
        const { contentWidth, gutter } = getContentWidth(containerWidth, numColumns, defaultGutter);
        const contentHeight = getContentHeight(images, contentWidth);
        const { coordinates, maxHeight } = getLayoutPosition(contentHeight, contentWidth, gutter, numColumns);

        return { contentWidth, contentHeight, coordinates, maxHeight };
    }, [images, containerWidth, defaultColumns]);

    // Currently does not correctly render images with max-width < containerWidth.
    return (
        <SimpleReactLightbox>
            <SRLWrapper options={LIGHTBOX_OPTIONS}>
                <div ref={containerRef}>
                    <div className="gallery-wrapper" style={{ height: maxHeight }}>
                        {contentWidth && images.map(({ alt, image }, i) => {
                            return (
                                <div
                                    key={image.id}
                                    style={{
                                        cursor: "pointer",
                                        position: 'absolute',
                                        top: coordinates[i].y,
                                        left: coordinates[i].x,
                                        width: contentWidth,
                                        height: contentHeight[i]
                                    }}
                                >
                                    <GatsbyImage 
                                        image={getImage(image)}
                                        alt={alt}
                                        loading={getImageLoadBehavior(containerWidth, i)}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SRLWrapper>
        </SimpleReactLightbox>
    );
};

export default Gallery;

Gallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            alt: PropTypes.string.isRequired,
            image: PropTypes.shape({
                id: PropTypes.string.isRequired,
                childImageSharp: PropTypes.shape({
                    gatsbyImageData: PropTypes.shape({
                        height: PropTypes.number,
                        images: PropTypes.object,
                        layout: PropTypes.string,
                        width: PropTypes.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        })
    ).isRequired,
    columns: PropTypes.number,
};

// simple-react-lightbox settings
const LIGHTBOX_OPTIONS = {
    settings: {
        disablePanzoom: true,
        hideControlsAfter: 2000,
        lightboxTransitionSpeed: 0.6,
        overlayColor: offWhite,
        slideTransitionSpeed: 0.6,
        slideTransitionTimingFunction: "easeIn",
    },
    buttons: {
        backgroundColor: "rgba(0,0,0,0)",
        iconColor: darkGrey,
        showAutoplayButton: false,
        showDownloadButton: false,
        showFullscreenButton: false,
    },
    caption: {
        showCaption: false,
    },
    progressBar: {
        showProgressBar: false,
    },
    thumbnails: {
        showThumbnails: false,
    },
};