const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const {
    isSubAlbum,
    getPageType,
    getParentAlbum,
    sortPagesByType,
    getSubAlbums,
    resolvePath
} = require(`./src/utils/albums`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const result = await graphql(
        `
            {
                allMarkdownRemark(
                    sort: { fields: [frontmatter___date], order: ASC }
                    limit: 1000
                ) {
                    nodes {
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
        `
    );

    if (result.errors) {
        throw result.errors;
    }

    // Create blog post pages.
    const pages = result.data.allMarkdownRemark.nodes;
    // Sort page data.
    const pagesByType = sortPagesByType(pages);

    const galleryPage = path.resolve(`./src/templates/gallery-template.js`);
    const designPage = path.resolve(`./src/templates/design-template.js`);
    pages.forEach((page, index) => {
        // const previous = index === pages.length - 1 ? null : pages[index + 1].node;
        // const next = index === 0 ? null : pages[index - 1].node;

        const { slug, type } = { ...page.fields };
        const parentAlbum = getParentAlbum(slug);
        const subAlbum = getSubAlbums(pagesByType.get(type).get(parentAlbum));

        const resolvedSlug = resolvePath(slug);

        const componentPage = () => {
            switch (type) {
                case 'design':
                    return designPage;
                default:
                    return galleryPage;
            }
        }

        // The slug is used as a Graphql variable in the template's graphql query.
        // See https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#creating-pages-in-gatsby-nodejs.
        createPage({
            path: resolvedSlug,
            component: componentPage(),
            context: {
                slug: resolvedSlug,
                subAlbum: subAlbum,
                type: type,
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
            value: `${resolvePath(relativeFilePath)}`,
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
            value: isSubAlbum(relativeFilePath),
        })
    }
};