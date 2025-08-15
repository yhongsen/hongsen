import React from 'react';

import Layout from './src/components/Layout';
import './src/styles/styles.scss';

/**
 * All props avaiable to a page will be available to Layout (incl. location prop).
 * Note: gatsby-browser.js and gatsby-ssr.js should match. See link below for more info.
 * https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 *
 * @param {*} element { ReactNode } - The "Page" React Element built by Gatsby
 * @param {*} props { object } - The "Page" React Element built by Gatsby
 * @returns { ReactNode } - Wrapped Element
 */
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
};