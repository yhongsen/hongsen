import React from 'react';

import Layout from './src/components/Layout';
import './src/styles/styles.scss';

// All props avaiable to a page will be available to Layout (incl. location prop)
// [Input] element { ReactNode } - The "Page" React Element built by Gatsby
// [Input] props { object } - Props object used by page
// [Output] { ReactNode } - Wrapped Element
export const wrapPageElement = ({ element, props }) => {
    return <Layout {...props}>{element}</Layout>
};
