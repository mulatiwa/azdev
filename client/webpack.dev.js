import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import output from 'webpack-merge';
import { host, isDev } from './src/config/app-config.js';
import { client, clientTitle } from './src/config/client-config.js';
import common from './webpack.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { merge } = output;

export default merge(common,
  {
    mode: (isDev === 'development') ? 'development' : 'production',
    output:
    {
      path: path.resolve(__dirname, '../..build'),
      filename: '[name].browser-bundle.js',
      publicPath: '/',
      // libraryTarget: 'module',
    },
/*     experiments: 
    {
      outputModule: true,
    }, */
    devtool: 'inline-source-map',
    devServer:
    {
      port: client,
      historyApiFallback: true, // true for index.html upon 404, object for multiple paths
      compress: true,
      liveReload: true,
      open: true,
      hot: true,
      host,
      client:
      {
        progress: true,
        overlay: true,
        logging: 'info',
      },
      static: 
      {
        directory: path.resolve( __dirname, '../build')
      }
      // magicHtml: true,
      // https: true,
/*       devMiddleware:
      {
        index: true,
        mimeTypes: {'text/html' : ['phtml']},
        publicPath: path.resolve(__dirname, '/build'),
        serverSideRender: true,
        writeToDisk: true,
      }, */
    },
    resolve:
    {
      symlinks: false,
      alias: {
        './src': '/',
        '.src': false,
      },
    },
    plugins:
    [
      new ReactRefreshPlugin(),
      new HtmlWebpackPlugin(
        {
          filename: 'index.html',
          title: clientTitle,
        }),      
    ],
    module:
    {
      rules:
      [
        {//JSX & JS
          test: /\.jsx?$/,
          use:
          {
            loader: 'babel-loader',
            options:
            {
              presets:
              [
                "@babel/preset-react"
              ],
              plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
            }
          },   
          exclude:
          [
            path.resolve(__dirname,  '/node_modules/')
          ]/*
          (1) these are matching conditions, each accepting a regular expression or string
          (2) test and include have the same behavior, both must be matched
          (3) exclude must not be matched (takes preference over test and include)
          (4) Best practices:
            - Use RegExp only in test and for filename matching
            - Use arrays of absolute paths in include and exclude
            - Try to avoid exclude and prefer include*/
        },
        {//SCSS - Styling
          test: /\.(sa|sc|c)ss$/,
          use:
          [
            'style-loader',//Injects styles into the DOM
            'css-loader',//2. Turns css into commonjs
            'sass-loader'//1. Turns sass into css
          ]
        }
      ]
    },
  }
  )