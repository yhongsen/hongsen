const path = require(`path`);
// const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const galleryPage = path.resolve(`./src/templates/gallery-template.js`);
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
                type
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

  // Create blog posts pages.
  const pages = result.data.allMarkdownRemark.edges;

  pages.forEach((page, index) => {
    // const previous = index === pages.length - 1 ? null : pages[index + 1].node;
    // const next = index === 0 ? null : pages[index - 1].node;

    const componentPage = () => {
        switch (page.node.frontmatter.type) {
            case 'gallery':
                return galleryPage;
            default:
                return galleryPage;
        }
    }

    createPage({
      path: page.node.frontmatter.slug,
      component: componentPage(),
      context: {
        slug: page.node.frontmatter.slug,
        // previous,
        // next,
      },
    });
  });
};

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const relativeFilePath = createFilePath({
//       node,
//       getNode,
//       trailingSlash: false,
//     })
//     createNodeField({
//       name: `slug`,
//       node,
//       value: `/tavel${relativeFilePath}`,
//     })
//   }
// };
