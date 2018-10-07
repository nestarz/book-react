import { darken } from 'polished';

const brand = {
  primary: '#eb1c24',
  secondary: '#111',
};

const colors = {
  grey: '#25252',
  black: '#111',
  red: '#eb1c24',
  bg_color: '#f4f4f4',
  body_color: '#111',
  link_color: brand.primary,
  link_color_hover: `${darken(0.15, brand.primary)}`,
};

export const overlay = ['#111'];

const theme = {
  brand,
  colors,
  breakpoints: {
    xs: '400px',
    s: '600px',
    m: '900px',
    l: '1200px',
  },
  container: {
    base: '100rem',
    text: '55rem',
  },
  spacer: {
    horizontal: '4rem',
    vertical: '6rem',
  },
};

export default theme;
