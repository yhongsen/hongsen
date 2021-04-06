import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

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

// Maybe use h2 since Navigation is using h1?
const AboutMe = () => (
    <div>
        <header>
            <h1>Hongsen</h1>
        </header>
        <p className="about-text">
            I am an avid photographer and graphic designer from Massachusetts now living
            in San Diego, California.
        </p>
        <p className="about-text">
            I graduated with a B.S. in Electrical Engineering from the University of
            Illinois at Urbana-Champaign in 2017 and an M.S. in Electrical Engineering
            from the University of California, San Diego in 2019.
        </p>
        <p className="about-text">
            Whether it’s photography, graphic design, or engineering, I am constantly
            drawing inspiration from my travels and everyday life. I focus on capturing
            natural light and clean composition in my work.
        </p>
        <p className="about-text">
            Feel free to reach out if you have any questions or want to get in touch.
        </p>
    </div>
);

const AboutPage = () => (
    <div className="about-wrapper">
        <GetAboutImage />
        <AboutMe />
    </div>
);

export default AboutPage;