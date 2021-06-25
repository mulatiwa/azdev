const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

const common = require('./webpack.config.js');

module.exports = merge(common,
{
  mode: 'production',/*
  (1) "production" | "development" | "none"
  (2) Chosen mode tells webpack to use its built-in optimizations accordingly.
  */
  output:
  { // options related to how webpack emits results
    path: path.resolve(__dirname, 'build'),/*
    (1) string
    (2) the target directory for all output files
    (3) must be an absolute path (use the Node.js path module)
    */
   filename: '[name].bundle-node.[contenthash].js',/*
    (1) string
    (2) the filename template for entry chunks*/
    publicPath: './',
    /*
    (1) string
    (2) the url to the output directory resolved relative to the HTML page
    */
    pathinfo: false,
  },
  externals: [nodeExternals({})],
});