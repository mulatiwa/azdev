import Clean from 'clean-webpack-plugin';
import CompressionPlugin from "compression-webpack-plugin";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { createRequire } from 'module';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import path, { dirname } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import webpackMerge from 'webpack-merge';
import zlib from "zlib";
import { isDev } from './src/config/app-config.js';
import { clientTitle } from './src/config/client-config.js';
import common from './webpack.config.js';



const { CleanWebpackPlugin } = Clean;
const { merge } = webpackMerge;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);


export default merge(common,
  {
    mode: (isDev === 'development') ? 'development' : 'production',/*
    (1) "production" | "development" | "none"
    (2) Chosen mode tells webpack to use its built-in optimizations accordingly.
    */
    output:
    {
      path: path.resolve(__dirname, '../build'),
      filename: 'js/client/[name].bundle-min.[contenthash].js',/*
      (1) string
      (2) the filename template for entry chunks*/
      publicPath: './',
      pathinfo: false,
      // libraryTarget: 'module',
    },  
/*     experiments: 
    {
      outputModule: true,
    }, */
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
                "@babel/preset-env",
                "@babel/preset-react"
              ],
              plugins: ["@babel/plugin-transform-runtime"],
            }
          },   
          // include:[path.resolve(__dirname, 'src')],
          exclude:
          [
            path.resolve(__dirname, './node_modules/')
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
          test: /\.s?css$/i,
          use:
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options:
              {
                publicPath: '../',
              }
            },//4. Extract css into files
            'css-loader',//3. Turns css into commonjs
            {//2. Adds vendor prefixes to css
              loader: 'postcss-loader',
              options:
              {
                postcssOptions:
                {
                  plugins:
                  [                  
                    'postcss-preset-env',
                    'postcss-normalize',
                  ]
                }
              }
            },          
            'sass-loader'//1. Turns sass into css
          ]
        },
        {//JSON
          test: /\.json$/i, 
          type: 'asset/resource',
          generator:
          {
            filename: 'assets/data/json/[name][hash][ext][query]',
          },
        },
      ]
    },
    devtool: 'source-map',
    optimization:
    {
      moduleIds: 'deterministic',
      splitChunks:
      {
        cacheGroups:
        {
          vendor:
          {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          }
        }
      },
      minimizer:
      [
        new OptimizeCssAssetsPlugin(
          {
            assetNameRegExp: /\.optimize\.s?css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: 
            {
              preset: ['default', { discardComments: { removeAll: true } }],
            }
          }
        ),
        new TerserPlugin(),
        new HtmlWebpackPlugin(
          {
            filename: 'index.html',
            title: clientTitle,
            minify:
            {
              collapseWhitespace: true,
              keepClosingSlash: true,//
              minifyJS: true,//1
              minifyCSS: true,//
              minifyURLs: true,//3
              
              removeAttributeQuotes: true,
              removeEmptyAttributes: true,//
              removeEmptyRedundantAttributes: true,//
              removeComments: true,
              // removeStyleLinkTypeAttributes: true,//
              // useShortDoctype: true,//
            }
          }), 
      ]
    },
    plugins:
    [
      new CompressionPlugin({
        filename: "[path][base].br",
        algorithm: "brotliCompress",
        test: /\.(jsx?|s?css|html|svg|png|jpe?g)$/,
        compressionOptions: {
          params: 
          {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: 
        {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: 
          [
            ['gifsicle',
              { 
                interlaced: true,
                optimizationLevel: 3,
                colors: 256,
              }],
            ['jpegtran', { progressive: true }],
            [
              'svgo',
              {
                plugins: 
                [
                  {
                    removeViewBox: false,
                  },
                ],
              },
            ],
          ],
        },
      }),
      new CleanWebpackPlugin(
        { 
          cleanStaleWebpackAssets: false 
        }),
      new MiniCssExtractPlugin(
        {
         filename: 'css/style.[contenthash].css',
  
        }),
    ],
    resolve:
    {
      symlinks: false,
      alias: {
        './src': '/',
        '.src': false,
      },
    },
  });