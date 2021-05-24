import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Button from './Button';
import SEO from './SEO';

const Get404Image = () => {
    return (
        <div className="not-found-image">
            <StaticImage
                src='../../content/assets/bb8-404.png'
                alt='404'
                placeholder='NONE'
                width={800}
            />
        </div>
    );
};

const NotFoundPage = () => (
    <div className="content-container">
        <div className="not-found-wrapper">
            <SEO />
            <Get404Image />
            <h1 className="not-found-header">404</h1>
            <p className="not-found-text">
                Oh no, you're lost! BB-8 will help guide you home.
            </p>
            <Button buttonText={"Back to Home"} path={"/"}/>
        </div>
    </div>
);

export default NotFoundPage;