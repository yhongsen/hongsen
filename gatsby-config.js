/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  // Enables server side render (SSR) in develop - used to detect SSR bugs
  flags: {
    DEV_SSR: true
  },

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
    // Generates favicon for browser tabs
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Hongsen Yang`,
        short_name: `Hongsen`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#121212`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },

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
          include: /assets/
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
        path: `${__dirname}/content/assets`,
        name: `assets`,
      }
    }, 
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
