import { Link } from 'gatsby';
import styled from 'react-emotion';

export const DeepImg = styled.img`
display: none;
&.hover {
  display: block;
  mix-blend-mode: overlay;
  filter: blur(0px);
}
`;

export const Wrapper = styled.div`
&:nth-child(1)  { flex-grow: 100;  }
&:nth-child(2)  { flex-grow: 2; }
&:nth-child(3)  { flex-grow: 1; }
&:nth-child(4)  { flex-grow: 1; }
&:nth-child(5)  { flex-grow: 3; }

  position: relative;
  min-width: 300px;
  max-height: 40vh;
  margin: 0vh 2vw 2vw 0vw;
  //border-right: 5px dotted ${props => props.theme.colors.body_color};
  //border-bottom: 5px dotted ${props => props.theme.colors.body_color};
  padding: 10px;
  opacity: 1;
  &:hover {
    opacity: 1
  }
  
  flex-grow: 1;
  width: 33%;
  &:before {
    content: '';
    display: block;
    padding-top: 40vh;
  }
`;

export const Content = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  a {
    color: #fff;
    height: 100%;
    left: 0;
    opacity: 0.1;
    mix-blend-mode: saturate;
    padding-bottom: calc(2 * calc(2 * .5rem));
    padding-left: 22px;
    padding-right: 22px;
    padding-top: calc(2 * .5rem);
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    border: 1px dashed #5B9982;
    border-radius: 0px;

    &:hover {
      color: #fff;
      opacity: 1;
      mix-blend-mode: overlay;
      text-decoration: none;
      filter: grayscale(0%) !important;
    }
  }
  header {
    margin: 0rem 0rem;
    //background-color : ${props => props.theme.colors.bg_color};
    color: ${props => props.theme.colors.bg_color};
    pointer-events: none;
    display: block;
    h2 {
      font-size: 44px;
      line-height: 50px;
      margin-bottom: 1rem;
      font-weight: 500;
      letter-spacing: calc(-23 / 1000 * 1em);
    }
    p {
      font-size: 22px;
      letter-spacing: calc(-6 / 1000 * 1em);
      font-weight: 400;
    }
  }
`;

export const ImageWrapper = styled.div`
  > div {
    height: 100%;
    left: 0;
    position: absolute !important;
    top: 0;
    width: 100%;
    //transform: rotate(${Math.random()*10}deg);
    z-index: -1;
    > div {
      position: static !important;
    }
  }
`;

export const OverlayLink = styled(Link)`
  //background-color: ${props => props.theme.colors.bg_color};
  //box-shadow: inset 0 0 300px ${props => props.theme.colors.body_color};
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: -1;
  filter: blur(0px);
`
