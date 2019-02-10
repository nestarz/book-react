import styled from 'styled-components';

export const Wrapper = styled.section`
max-width: 40rem;
font-size: 100%;
letter-spacing: -0.01em;

margin: auto;
@media not print {
  padding:0px 1em 1em 1em;
}
display: flex;
flex-direction: column;
page-break-before: always;

& > div div {
  page-break-inside: avoid;
}
& > div {
  & > h1 {
    display: list-item;
    list-style-type: decimal-leading-zero;
    list-style-position: inside;
  }
  & > h1 {
    display: block;
    page-break-before: always;
    display: list-item;
    list-style-type: decimal-leading-zero;
    list-style-position: inside;
    @media (max-width: 700px) {
      list-style-position: inside;
    }
  }
}
p {
  line-height: 1.3;
}
& > div ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  li:last-child {
  }
}
& > div ol,
& > div ul {
  column-fill: balance;
  column-count: 2;
  @media (max-width: 700px) {
    column-count: 1;
    column-gap: 0;
  }
  column-gap: 2em;
  orphans: 3;
  widows: 3;
  overflow: hidden;
  word-break: break-word;
  li {
    margin: 0;
    margin-bottom: 1.0em;
    column-break-inside : avoid;
    & > p {
      margin: 0;
    }
    a {
      text-decoration: none;
      display: block;
      font-size: 100%;
      }
    a:hover {
      text-decoration: underline;
    }
    & > a + img {
      margin-top: 1.5em;
      margin-bottom: 1.5em;
    }
  }
}
& > div ul {
  column-gap: 1em;
}
img {
  margin: auto;
  display: table-cell;
  max-width: 100%;
}

.gatsby-resp-image-wrapper {
  margin-bottom: 20px !important;
  -webkit-column-break-inside: avoid; /* Chrome, Safari, Opera */
  page-break-inside: avoid; /* Firefox */
  break-inside: avoid; /* IE 10+ */
  break-inside: avoid-column; /* W3C */
  display: inline-block;
}
  & > div {
      height: inherit !important;
      width: inherit !important;
  }
}
`;
