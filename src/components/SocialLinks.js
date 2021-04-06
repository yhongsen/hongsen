import React from 'react';
import {
    GITHUB_URL,
    INSTAGRAM_URL,
    LINKEDIN_URL
} from "../utils/defs";
import GithubIcon from "../../content/assets/social/github.svg"
import InstagramIcon from "../../content/assets/social/instagram.svg"
import LinkedinIcon from "../../content/assets/social/linkedin.svg"

// Need gatsby-plugin-react-svg to load svg files

export const Github = () => (
    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
        <GithubIcon className={"socialIcon"} />
    </a>
)
export const Instagram = () => (
    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        <InstagramIcon className={"socialIcon"} />
    </a>
)
export const Linkedin = () => (
    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
        <LinkedinIcon className={"socialIcon-small"} />
    </a>
)

const SocialLinks = () => (
    <div className={"socialLinks"}>
        <Linkedin />
        <Github />
        <Instagram />
    </div>
)

export default SocialLinks

