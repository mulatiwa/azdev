'use strict'
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IS_DEV, IS_PROD } from '../../env-variables/env-var[app].js';

export default () =>
{
  const rules_styles = { test: /\.(sa|sc|c)ss$/ };

  if (IS_DEV) 
  {
    rules_styles.use = [
      'style-loader',// 4. Injects styles into the DOM
      'css-loader',// 3. Turns css into commonjs
      'postcss-loader', //  2. Process css
      'sass-loader'//1. Compile sass/scss into css
    ];    
  }

  if (IS_PROD)
  {
    rules_styles.use =      [
      {//4. Extract css into files
        loader: MiniCssExtractPlugin.loader,
        options:
        {
          publicPath: '../',
        }
      },
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
  }

  return rules_styles;
}
