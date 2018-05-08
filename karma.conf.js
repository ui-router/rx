const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const async = require('rollup-plugin-async');

module.exports = function(karma) {
  const config = {
    singleRun: true,
    autoWatch: false,
    autoWatchInterval: 0,
    logLevel: 'warn',
    reporters: ['super-dots', 'mocha'],
    mochaReporter: {
      output: 'minimal',
    },
    colors: true,
    port: 8080,
    basePath: '.',
    // browsers: ['ChromeHeadlessNoSandbox'],
    browsers: ['Chrome'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] },
    },

    frameworks: ['jasmine'],

    files: [{ pattern: 'test/**/*.js', watched: false }],

    preprocessors: {
      'test/**/*.js': ['rollup'],
    },

    rollupPreprocessor: {
      plugins: [nodeResolve({ jsnext: true }), commonjs(), async()],
      output: {
        format: 'iife',
      },
    },
  };

  karma.set(config);
};
