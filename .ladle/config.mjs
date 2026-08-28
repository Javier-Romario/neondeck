export default {
  stories: 'stories/**/*.stories.{js,jsx,ts,tsx}',
  viteConfig: 'vite.config.mjs',
  outDir: 'build',
  // Responsive sidebar: Ladle pins the aside to a fixed flex-basis (0 0 12em)
  // so story names get clipped. Size it to its content instead, with a cap so
  // it never pushes the preview off screen.
  appendToHead: `<style>
    .ladle-aside a,
    .ladle-aside li > div > div {
      min-width: 0;
    }
    @media (min-width: 768px) {
      .ladle-aside {
        flex: 0 0 auto;
        min-width: 15em;
        max-width: 40vw;
      }
    }
  </style>`,
};
