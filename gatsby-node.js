const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: ASC }
                    limit: 1000
                ) {
                    edges {
                        node {
                            fields {
                                slug
                                type
                                isSubAlbum
                            }
                            frontmatter {
                                title
                                subAlbumTitle
                            }
                        }
                    }
                }
            }
        `
    );

    if (result.errors) {
        throw result.errors;
    }

    // Create blog post pages.
    const pages = result.data.allMarkdownRemark.edges;

    /** 
     * Create a subAlbums map to track pages that are potentially apart of a sub-album. This will
     * be used to navigate between sub-album pages. The map will also include the parent album 
     * page for backtracking.
     * 
     * A sub-album exists if there's more than one page in the list.
     */ 
    const subAlbums = new Map();
    const slugToParentAlbum = new Map();
    pages.forEach((page, index) => {
        /**
         * Example pathElements results:
         * [travel, japan, japan-2017]  -> sub-album to the Japan album
         * [travel, japan]              -> parent Japan album
         * [travel, national-parks]     -> parent National Parks album
         * [portrait]                   -> top-level Portraits gallery; skip this
         * 
         * Example subAblums results: (each entry here is a page)
         * japan: [japan, japan-2017, japan-2019, japan-2023]   -> is a sub-album
         * national-parks: [national-parks]                     -> not a sub-album
         */

        // Add all potential sub-album candidates (pathElements.length > 1) into the subAlbums map.
        const slug = page.node.fields.slug
        const pathElements = pathSplit(slug);
        if (pathElements.length > 1) {
            const parentAlbum = pathElements[1];
            if (!subAlbums.has(parentAlbum)) {
                subAlbums.set(parentAlbum, []);
            }
            subAlbums.get(parentAlbum).push(page);

            // Build reverse mapping to simplify finding which subAlbum a page belongs to.
            slugToParentAlbum.set(slug, parentAlbum);
        }
    });

    const galleryPage = path.resolve(`./src/templates/gallery-template.js`);
    const designPage = path.resolve(`./src/templates/design-template.js`);
    pages.forEach((page, index) => {
        // const previous = index === pages.length - 1 ? null : pages[index + 1].node;
        // const next = index === 0 ? null : pages[index - 1].node;

        // A subAlbum exists if there's more than one page in the list.
        const slug = page.node.fields.slug;
        const parentAlbum = slugToParentAlbum.get(slug)
        const subAlbum = parentAlbum && (subAlbums.get(parentAlbum).length > 1) ? subAlbums.get(parentAlbum) : [];

        const componentPage = () => {
            switch (page.node.fields.type) {
                case 'design':
                    return designPage;
                default:
                    return galleryPage;
            }
        }

        // The slug is used as a Graphql variable in the template's graphql query.
        // See https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs.
        createPage({
            path: slug,
            component: componentPage(),
            context: {
                slug: slug,
                subAlbum: subAlbum,
                // previous,
                // next,
            },
        });
    });
};

/**
 * Creates a new 'fields' node in the MarkdownRemark query and add parameters not supplied
 * in the markdown file. These parameters are determined based on the markdown filepath.
 * 
 * Generated parameters:
 * - slug: The page URL
 * - type: The page type used to distinguish between design and travel collections
 * - isSubAlbum: A bool tracking whether or not a page is a sub-album (will be used to 
 * render only parent albums on collections pages)
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions

    if (node.internal.type === `MarkdownRemark`) {
        // Creates the page slug in the field node based on the relative filepath of markdown files.
        const relativeFilePath = createFilePath({
            node,
            getNode,
            trailingSlash: false,
        })
        createNodeField({
            name: `slug`,
            node,
            value: `${relativeFilePath}`,
        })

        // Infer the page type (design, travel, etc.) based on the relative filepath.
        createNodeField({
            name: `type`,
            node,
            value: `${getPageType(relativeFilePath)}`,
        })

        // Determine if a page is a sub-album based on the relative filepath.
        // Note: The parent albums will be considered as 'false'.
        createNodeField({
            name: `isSubAlbum`,
            node,
            value: `${isSubAlbum(relativeFilePath)}`,
        })
    }
};

/**
 * Helper function to split the relative filepath into a list. The substring(1) is
 * needed to avoid getting an empty string as the first element due to the first "/".
 * 
 * @param {string} path - The relative filepath of a markdown file
 * @returns list of the filepath components
 */
const pathSplit = (path) => {
    return path.substring(1).split("/");
};

/**
 * Helper function to determine whether or not a page is a sub-album.
 * 
 * Example path 1: /travel/japan/japan-2017
 * After pathSplit: [travel, japan, japan-2017] -> is a sub-album
 * Example path 2: /travel/japan
 * After pathSplit: [travel, japan]             -> is not a sub-album
 * 
 * @param {String} path - The relative filepath of a markdown file
 * @returns bool if the page is a sub-album
 */
const isSubAlbum = (path) => {
    return pathSplit(path).length > 2;
};

/**
 * Helper function to determine the page type.
 *  
 * Example 1: /travel/japan/japan-2017  -> returns 'travel'
 * Example 2: /design/illustrations     -> returns 'design'
 * Example 3: /portrait                 -> returns 'portrait'
 * 
 * @param {string} path - The relative filepath of a markdown file
 * @returns string of the page type
 */
const getPageType = (path) => {
    return pathSplit(path)[0];
};