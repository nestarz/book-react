import { graphql, StaticQuery } from "gatsby";
import React from "react";

const queryProjects = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "listentothis" } } }
    ) {
      edges {
        node {
          fields {
            slug
            graphbrainz__release {
              title
              date
              coverArtArchive {
                front
              }
              artistCredits {
                name
              }
            }
          }
          parent {
            ... on File {
              mtime(formatString: "DD.MM.YYYY")
              birthtimeTimeStamp: birthtime
              birthtime(formatString: "DD.MM.YYYY")
            }
          }
          excerpt(pruneLength: 70)
          code {
            body
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;

export default props => {
  const { children } = props;
  return (
    <StaticQuery
      query={queryProjects}
      render={data => {
        const playlists = data.allMdx.edges.map((edge, i) => ({
          frontmatter: edge.node.frontmatter,
          playlist: edge.node.fields.graphbrainz__release,
          body: edge.node.code.body,
        }));
        return children(playlists);
      }}
    />
  );
};
