const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./webpack.config.js');

module.exports = merge(common,
{
  mode: 'production',
  output:
  { // options related to how webpack emits results
    path: path.resolve(__dirname, 'build'),

   filename: '[name].bundle-node.[contenthash].js',
    pathinfo: false,
  },
  externals: [nodeExternals({})],
});