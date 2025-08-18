import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import '../styles/components/button.scss';

export const Button = ({ buttonText, path }) => {
    return (
        <Link to={path} className="button-link">
            <div className="button">
                {buttonText}
            </div>
        </Link>
    );
};

export const BackToTopButton = () => {
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

    return (
        <button className="bttb" aria-label="Back to top" onClick={scrollUp}>
            <div className="bttb-container">
                <span className={`bttb-arrow`}/>
            </div>
        </button>
    );
};

export const GalleryButtons = ({ renderButton = true, type }) => {
    const wrapperClassName = renderButton ? "button-wrapper" : "button-wrapper__single";

    // Optionally render "Back to Collection" button that don't have collections like the
    // home and portrait pages. Check if the "title" exists in the md file.
    return (
        <div className={wrapperClassName}>
            {renderButton && <Button buttonText={"Back to Collection"} path={`/${type}`} />}
            <BackToTopButton />
        </div>
    );
};

Button.propTypes = {
    buttonText: PropTypes.string,
    path: PropTypes.string,
};