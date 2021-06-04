/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';

function SEO({ description, lang, meta, image: metaImage, title }) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author {
                            name
                        }
                        keywords
                        siteUrl
                    }
                }
            }
        `
    );

    const metaDescription = description || site.siteMetadata.description;
    const metaTitle = title || site.siteMetadata.title
    const image =
        metaImage && metaImage.src
            ? `${site.siteMetadata.siteUrl}${metaImage.src}`
            : null;

    /**
    * `titleTemplate` is the text that's shown in the browser tab, with `title`
    * being inserted in the %s. If empty, it displays the `defaultTitle`
    * Example 1: title is Photography -> "Photography | Lingene Yang"
    * Example 2: title is undefined -> "Lingene Yang"
    */
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            defaultTitle={site.siteMetadata.title}
            title={title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                {
                    name: "keywords",
                    content: site.siteMetadata.keywords.join(","),
                },
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
            ]
                .concat(
                    metaImage
                        ? [
                            {
                                property: "og:image",
                                content: image,
                            },
                            {
                                property: "og:image:width",
                                content: metaImage.width,
                            },
                            {
                                property: "og:image:height",
                                content: metaImage.height,
                            },
                            {
                                name: "twitter:card",
                                content: "summary_large_image",
                            },
                        ]
                        : [
                            {
                                name: "twitter:card",
                                content: "summary",
                            },
                        ]
                )
                .concat(meta)}
        />
    )
};

SEO.defaultProps = {
    lang: `en`,
    meta: [],
    description: ``,
    title: undefined,
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    image: PropTypes.shape({
        src: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
    }),
};

export default SEO;