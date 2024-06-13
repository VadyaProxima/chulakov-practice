import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';
import { defineConfig } from 'vite';

const targets = browserslistToTargets(browserslist('>=0.25%'));

export default defineConfig ({
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      targets: targets,
      options: {
        customProperties: true,
        minify: true,
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src/partials'),
      context: {
        title: 'Hello, world!',
      },
    }),
  ],
  build: {
    target: 'esnext',
    cssMinify: 'lightningcss'
  },
});
