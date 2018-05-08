import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from 'rollup-plugin-commonjs';

let MINIFY = process.env.MINIFY;

let pkg = require('./package.json');
let banner = `/**
 * ${pkg.description}
 * @version v${pkg.version}
 * @link ${pkg.homepage}
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */`;

let uglifyOpts = { output: {} };
// retain multiline comment with @license
uglifyOpts.output.comments = (node, comment) => comment.type === 'comment2' && /@license/i.test(comment.value);

let plugins = [nodeResolve({ jsnext: true }), sourcemaps(), commonjs()];

if (MINIFY) plugins.push(uglify(uglifyOpts));

let extension = MINIFY ? '.min.js' : '.js';

// Suppress this error message... there are hundreds of them. Angular team says to ignore it.
// https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED') return;
  console.error(warning.message);
}

function isExternal(id) {
  // @uirouter/core and rxjs should be external
  let externals = [/^rxjs\/?/, /\/rxjs\//, /^@uirouter\/.*/];
  let isExternal = externals.map(regex => regex.exec(id)).reduce((acc, val) => acc || !!val, false);
  // console.log(id, isExternal);
  return isExternal;
}

const CONFIG = {
  input: 'lib-esm/index.js',
  output: {
    file: '_bundles/ui-router-rx' + extension,
    name: '@uirouter/rx',
    globals: {
      '@uirouter/core': '@uirouter/core',
      '@uirouter/rx': '@uirouter/rx',
    },
    sourcemap: true,
    banner: banner,
    format: 'umd',
    exports: 'named',
  },

  plugins: plugins,
  onwarn: onwarn,
  external: isExternal,
};

export default CONFIG;
