import React from 'react';
import PropTypes from 'prop-types';

import '../styles/components/container.scss';

const Container = ({ children }) => (
    <div className={"content-container"}>{children}</div>
);

// import { contentContainer } from './container.module.scss';

// const Container = ({ children }) => (
//     <div className={contentContainer}>{children}</div>
// );

Container.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Container;