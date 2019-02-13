const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

const wrapper = promise =>
  promise
    .then(result => {
      return { result, error: null };
    })
    .catch(error => ({ error, result: null }));

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"]
    }
  });
  if (stage === "build-html" || stage === "develop-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /react-audio-waveform/,
            use: loaders.null()
          }
        ]
      }
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const fragments = require("./src/fragments/createPages");
  const { result } = await wrapper(graphql(fragments.pages));
  if (result.errors) throw result.errors;
  const pages = [
    {
      component: require.resolve("./src/templates/project.jsx"),
      edges: result.data.projects.edges
    },
    {
      component: require.resolve("./src/templates/project.jsx"),
      edges: result.data.billets.edges
    },
    {
      component: require.resolve("./src/templates/letter.jsx"),
      edges: result.data.letters.edges
    },
    {
      component: require.resolve("./src/templates/playlist.jsx"),
      edges: result.data.listentothis.edges
    }
  ];
  pages.forEach(({ component, edges }) =>
    edges.forEach((edge, index) => {
      const previous =
        index === edges.length - 1 ? null : edges[index + 1].node;
      const next = index === 0 ? null : edges[index - 1].node;
      const mbid =
        edge.node.frontmatter && edge.node.frontmatter.mbid
          ? edge.node.frontmatter.mbid
          : null;
      createPage({
        path: edge.node.fields.slug,
        component: component,
        context: {
          mbid: mbid,
          slug: edge.node.fields.slug,
          previous,
          next
        }
      });
    })
  );
};

const {
  default_musicBrainzReleaseFields,
  queryMusicBrainzRelease
} = require("./src/fragments/musicbrainz");
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  switch (node.internal.type) {
    case `JavascriptFrontmatter`:
    case `Mdx`:
      createNodeField({
        name: `slug`,
        node,
        value: createFilePath({ node, getNode })
      });
      const fileNode = getNode(node.parent);
      createNodeField({
        name: "sourceInstanceName",
        node,
        value: fileNode.sourceInstanceName
      });
      let release_fields = [];
      if (fileNode.sourceInstanceName == `listentothis`) {
        const mbids = Array.isArray(node.frontmatter.mbid)
          ? node.frontmatter.mbid
          : [node.frontmatter.mbid];
        mbids.forEach(async mbid => {
          const { result } = await wrapper(
            queryMusicBrainzRelease(mbid)
          );
          release_fields.push({
            ...default_musicBrainzReleaseFields,
            ...result.lookup.release
          });
        });
      }
      createNodeField({
        name: "graphbrainz__release",
        node,
        value: release_fields
      });
  }
};
