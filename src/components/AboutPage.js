import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import {
    GITHUB_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL
} from "../utils/defs";

const GetAboutImage = () => {
    return (
        <div className="about-image">
            <StaticImage
                src='../../content/assets/hongsen_crop.jpg'
                alt='Hongsen Yang'
                placeholder='blurred'
                width={400}
            />
        </div>
    );
};

const AboutMe = () => (
    <div>
        <header className="about-header">
            <h2>Hongsen Yang</h2>
        </header>
        <p className="about-text">
            Hi, my name is Hongsen and I'm a photographer, designer, and RF engineer.
        </p>
        <p className="about-text">
            I graduated with a B.S. in Electrical Engineering from the University of
            Illinois at Urbana-Champaign in 2017, and an M.S. in Electrical Engineering
            from the University of California, San Diego in 2019.
        </p>
        <p className="about-text">
            Whether it’s photography, design, or engineering, I'm constantly
            drawing inspiration from my travels and everyday life.
        </p>
        <p className="about-text">
            Feel free to reach out if you have any questions or want to get in touch.
        </p>
    </div>
);

const Social = () => (
    <div className="about-links">
        <a href={LINKEDIN_URL} className="about-link">LinkedIn</a>
        <a href={GITHUB_URL} className="about-link">Github</a>
        <a href={INSTAGRAM_URL} className="about-link">Instagram</a>
    </div>
);

const AboutPage = () => (
    <div className="about-wrapper">
        <GetAboutImage />
        <AboutMe />
        <Social />
    </div>
);

export default AboutPage;