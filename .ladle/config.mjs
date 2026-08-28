export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  viteConfig: 'vite.config.mjs',
  outDir: 'build',
  // Fix sidebar text clipping: Ladle tree rows are flex, but the text
  // flex-items lack min-width:0, so nowrap text refuses to shrink and
  // gets cut off at the aside's right edge.
  appendToHead: `<style>
    .ladle-aside a,
    .ladle-aside li > div > div {
      min-width: 0;
    }
  </style>`,
};
