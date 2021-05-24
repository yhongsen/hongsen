import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Button = ({ buttonText, path }) => {
    return (
        <Link to={path} className="button-link">
            <div className="button">
                {buttonText}
            </div>
        </Link>
    )
};

Button.propTypes = {
    buttonText: PropTypes.string,
    path: PropTypes.string,
};

export default Button;