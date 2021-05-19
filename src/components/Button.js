import React from 'react';
import { Link } from 'gatsby';

const Button = ({ buttonText, path }) => {
    return (
        <Link to={path} className="button-link">
            <div className="button">
                {buttonText}
            </div>
        </Link>
    )
};

export default Button;