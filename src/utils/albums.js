/**
 * Helper function to split the relative filepath into a list. The substring(1) is
 * needed to avoid getting an empty string as the first element due to the first "/".
 * 
 * Examples:
 * /travel/japan/japan-2017     -> [travel, japan, japan-2017]
 * /travel/japan                -> [travel, japan]
 * /travel/national-parks       -> [travel, national-parks]
 * /portrait                    -> [portrait]
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

/**
 * Helper function to get a page's parent album.
 * 
 * Example 1: /travel/japan/japan-2017  -> returns 'japan'
 * Example 2: /travel/japan             -> returns 'japan'
 * Example 3: /portrait                 -> returns 'portrait'
 * 
 * @param {string} path - The relative filepath of a markdown file
 * @returns string of the path's parent album
 */
const getParentAlbum = (path) => {
    const pathElements = pathSplit(path);
    return pathElements[1] ? pathElements[1] : pathElements[0];
};

/**
 * A helper function to reconstruct data from GraphQL queries into a map of maps data
 * structure that other components like Navigation.js and gatsby-node.js can utilize.
 * 
 * This function also associates any sub-album to its parent-album such that it can be
 * easily iterated upon.
 * 
 * Example output data structure:
 * {
 *   'travel': {
 *     {
 *       'title': 'Japan',
 *       'slug': '/travel/japan',
 *       'subAlbums': [
 *           {
 *             'title': 'Japan I',
 *             'slug': '/travel/japan/japan-2017',
 *           },
 *           ...
 *       ],
 *     },
 *     {
 *       'title': 'california',
 *       'slug': '/travel/california,
 *       'subAlbums': [],
 *     },
 *     ...
 *   },
 *   'design': {
 *	   ...
 *   },
 *   ...
 * }
 * 
 * Top-level map: key = the page type, value = an object of pages with that page type
 * Secondary map: key = the parent album, value = an object containing { title, slug,
 * and subAlbum } attributes of the parent album
 * 
 * @param {List[object]} pages - a list of pages containing a fields and frontmatter
 * attribute from a GraphQL query:
 * page.field = { slug, type, isSubAlbum }
 * page.frontmatter.title = { title }
 * @returns a map with each page organized by album type.
 */
const sortPagesByType = (pages) => {
    const pagesByType = new Map();

    pages.forEach((page, index) => {
        const { slug, type, isSubAlbum } = { ...page.fields };
        const { title, subAlbumTitle } = { ...page.frontmatter };
        const parentAlbum = getParentAlbum(slug);

        // Optionally use subAlbumTitle property if provided in md file
        const pageData = {
            title: subAlbumTitle ? subAlbumTitle : title,
            slug: slug,
            subAlbums: [],
        }

        // Add a new Map for each page type (e.g., travel, design)
        if (!pagesByType.has(type)) {
            pagesByType.set(type, new Map());
        }
        // Insert pages into the appropriate map (order is determined by query)
        if (!isSubAlbum) {
            // is a parent album
            pagesByType.get(type).set(parentAlbum, pageData);
        } else {
            // is a sub-album
            pagesByType.get(type).get(parentAlbum).subAlbums.push(pageData);
        }
    });

    return pagesByType;
};

/**
 * A helper function to get a list of sub-albums associated with a parentAlbum. The parent album
 * will be inserted at the beginning of the list with the title of "Highlights".
 * 
 * Note: See the sortPagesByType() helper function for data structure details.
 * 
 * @param {object} parentAlbum - an object that contains the title and slug attributes of the
 * parent album as well as a list of associated sub-albums, also with title and slug attributes.
 * @returns a list of subAlbums objects containing title and slug attributes, or an empty list
 * if no subAlbums exist.
 */
const getSubAlbums = (parentAlbum) => {
    const { slug, subAlbums } = { ...parentAlbum };
    return subAlbums.length > 0 ? [{ title:"Highlights", slug: slug, }, ...subAlbums ] : [];
};

/**
 * Use gatsby-node to generate the home page from home.md by replacing its path "/home" with
 * the root path "/".
 * 
 * Reason: mini-css-extract-plugin was throwing "Conflicting order" warnings after updating
 * depencies. Root caused it to the src/pages/index.js using the Gallery component. As a WAR,
 * let gatsby-node generate the home page gallery instead.
 * 
 * @param {string} slug - a Page slug
 * @returns a string of the modified slug if it has the path "/home"
 */
const resolvePath = (slug) => {
    return slug === "/home" ? "/" : slug;
};

/**
 * Note: Must use CommonJS export syntax in order to import functions to gatsby-node.js. This
 * may be resolved in later Gatsby versions.
 * 
 * See issues:
 *  - https://github.com/gatsbyjs/gatsby/issues/7810
 *  - https://github.com/gatsbyjs/gatsby/discussions/31599
 * 
 * Example Usage:
 * // import using require
 * const { sortPagesByType, getSubAlbums, getParentAlbum } = require('../utils/album');
 * // before iterating
 * const pagesByType = sortPagesByType(pages);
 * // during page iteration
 * const parentAlbum = getParentAlbum(slug);
 * const subAlbum = getSubAlbums(pagesByType.get(type).get(parentAlbum));
 */
module.exports = {
    pathSplit: pathSplit,
    isSubAlbum: isSubAlbum,
    getPageType: getPageType,
    getParentAlbum: getParentAlbum,
    sortPagesByType: sortPagesByType,
    getSubAlbums: getSubAlbums,
    resolvePath: resolvePath,
};