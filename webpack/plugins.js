'use strict';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import zlib from "zlib";
import { IS_DEV, IS_PROD } from '../env-variables/env-var[app].js';
import { CLIENT_TITLE } from '../env-variables/env-var[client].js';
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory

export default () =>
{
  const plugins = [];

  if (IS_DEV) 
  {
    plugins.push(new ReactRefreshPlugin(),);
    plugins.push(new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        title: `${CLIENT_TITLE}`,
        favicon: resolve(__dirname, '../src[web-app]/assets/lisenzii/logo/SVG/lisenzii.svg'),
        meta: {
          
        },
      }
    ));
  }

  if (IS_PROD) 
  {
    // Compression
    plugins.push(  new CompressionPlugin(
      {
        test: /\.(jsx?|s?css|html|svg|png|jpe?g)$/,
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        compressionOptions: 
        {
          params: 
          {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }
    ));
  // [Minimizer: images]
    plugins.push(  new ImageMinimizerPlugin(
      {
        minimizerOptions: 
        {
          plugins: 
          [
            ['gifsicle', { interlaced: true, optimizationLevel: 3, colors: 256 }],
            ['jpegtran', { progressive: true }],
            ['svgo',{ plugins: [{ removeViewBox: false }] }]
          ],
        },
      }
    ));
    plugins.push(  new MiniCssExtractPlugin(
      {
        filename: 'css/style.[contenthash].css', 
       }
    ));    
  }

  return plugins;
}
