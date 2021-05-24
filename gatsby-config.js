/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Hongsen Yang',
    description: 'Portfolio website of Hongsen Yang. Photographer, designer, and RF engineer based in San Deigo, CA.',
    author: {
      name: 'Hongsen Yang',
    },
    keywords: ['photography', 'travel', 'portrait', 'design', 'illustration', 'portfolio'],
    siteUrl: 'https://www.hongsenyang.com',
  },

  plugins: [
    // CSS Plugins
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        // Override the file regex for CSS modules (see https://www.gatsbyjs.com/plugins/gatsby-plugin-sass/)
        // sassRuleModulesTest: /style\.s(a|c)ss$/,
      },
    },
    
    // Image plugins
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 100,
      }
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        }
      }
    },
    
    // File parsers
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-transformer-yaml`,
      options: {
        typeName: `Yaml`,
      }
    },

    // gatsby-source-filesystem 
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: `pages`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/images`,
        name: `images`,
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/galleries`,
        name: `galleries`,
      }
    },

    // Other
    `gatsby-plugin-react-helmet`,
  ],
}
