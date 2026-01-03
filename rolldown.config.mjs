import { defineConfig } from 'rolldown';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const banner = `/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

export default defineConfig({
  input: 'lib-esm/index.js',
  output: {
    file: '_bundles/ui-router-rx.js',
    name: '@uirouter/rx',
    globals: {
      '@uirouter/core': '@uirouter/core',
      '@uirouter/rx': '@uirouter/rx',
      rxjs: 'rxjs',
      'rxjs/operators': 'rxjs.operators',
    },
    sourcemap: true,
    banner: banner,
    format: 'umd',
    exports: 'named',
  },
  external: [/^rxjs\/?/, /\/rxjs\//, /^@uirouter\/.*/],
});
