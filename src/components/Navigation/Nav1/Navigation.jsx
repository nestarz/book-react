import React from 'react';
import { Link } from 'gatsby';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { css } from 'react-emotion';

import GenerativeFont from '../../../components/GenerativeFont';

import config from '../../../../config/website';
import { 
    Wrapper,
    Name,
    RightGroup,
    Nav,
    SocialMedia,
    active
} from "./styles";

const Navigation = (theme) => {
  return (
  <Wrapper>
    <Name>
    <Link to="/">{config.siteTitle},</Link>
    <span>{config.siteDescription}</span>
    </Name>
    <RightGroup>
      {/* <Nav>
        <Link
          to="/"
          activeClassName={css`
            ${active};
          `}
        >
          Work
        </Link>
        <Link
          to="/share"
          activeClassName={css`
            ${active};
          `}
        >
          Share
        </Link>
        <Link
          to="/sketches"
          activeClassName={css`
            ${active};
          `}
        >
          Fun
        </Link>
        <Link
          to="/info"
          activeClassName={css`
            ${active};
          `}
        >
          Info
        </Link>
      </Nav> */}
      <SocialMedia>
      <a href="https://github.com/nestarz" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://www.instagram.com/eliasrhouzlane" target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
        <a href="https://linkedin.com/in/elias-rhouzlane-56070197/" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="https://are.na/elias-rhouzlane/" target="_blank" rel="noopener noreferrer">
          Email
        </a>
        <Link
          to="/cv"
        >CV
        </Link>
      </SocialMedia>
    </RightGroup>
  </Wrapper>
)};

export default Navigation;
