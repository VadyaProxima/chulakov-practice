import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import path from 'path';
import handlebars from 'vite-plugin-handlebars';

const targets = browserslistToTargets(browserslist('>=0.25%'));

export default {
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
    // Удалено: дублирование lightningcss
  ],
  build: {
    target: targets,
    cssMinify: 'lightningcss'
  },
};
