import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import { fileURLToPath } from 'url';
import { IS_PROD } from '../env-variables/env-var[app].js';
import { CLIENT_TITLE } from '../env-variables/env-var[client].js';
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory

export default () =>
{
  const optimizations = { };

  if (IS_PROD) 
  {
    optimizations.moduleIds = 'deterministic';
    optimizations.splitChunks =   {
      cacheGroups:
      {
        vendor:
        {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        }
      }
    };
    optimizations.minimizer =  [
      new OptimizeCssAssetsPlugin(
        {
          assetNameRegExp: /\.optimize\.s?css$/g,
          cssProcessor: import('cssnano'),
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
          title: CLIENT_TITLE,
          favicon: resolve(__dirname, '../src[web-app]/assets/lisenzii/logo/SVG/lisenzii.svg'),
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
  }

  return optimizations;
}