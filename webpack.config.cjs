/* global __dirname */
const path = require('node:path');

module.exports = [
  {
    mode: 'production',
    entry: {
      globus: path.resolve(__dirname, './dist/esm/index.js'),
    },
    output: {
      path: path.resolve(__dirname, './dist/umd'),
      filename: '[name].production.js',
      library: 'globus',
    },
  },
];
