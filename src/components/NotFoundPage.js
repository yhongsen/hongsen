import React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';

const Get404Image = () => {
    return (
        <div>
            <StaticImage
                src='../../content/assets/bb8-404.png'
                alt='404'
                placeholder='blurred'
                width={400}
            />
        </div>
    );
};

const NotFoundPage = () => (
    <div className="content-container">
        <div className="not-found-wrapper">
            <Get404Image />
            <h1 className="not-found-header">404</h1>
            <p className="not-found-text">
                Oh no, you're lost! BB-8 will help guide you <Link to="/" className="not-found-link">home</Link>.
            </p>
        </div>
    </div>
);

export default NotFoundPage;