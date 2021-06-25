import path, { dirname, resolve } from 'path';
import nodeExternals from 'webpack-node-externals';
import output   from 'webpack-merge';
const {merge} = output
import webpack from 'webpack';
import common from './webpack.config.js';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common,
{
  mode: 'development',/*
  (1) "production" | "development" | "none"
  (2) Chosen mode tells webpack to use its built-in optimizations accordingly.
  */

  externals:
  [
    nodeExternals()
  ],
  output: 
  {
    path: resolve(__dirname, '/'),
    filename: '[name].node.js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer:
  {
    proxy:
    { // proxy URLs to backend development server
      '/api': 'http://localhost:9550'
    },
    port: 8550,
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    compress: true,
    open: true,
    hot: true,
    publicPath: '/',
  },
  //…
}
)