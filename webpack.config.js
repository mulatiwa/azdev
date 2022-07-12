'use strict';

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { ENV, IS_DEV } from './env-variables/env-var[app].js';
import { devServer, entry, optimizations, output, plugins, target } from './webpack/index[webpack-config].js';
import { data, fonts, html, images, js, json, scss, vectors, xml } from './webpack/rules/index[rules].js';

const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory

export default () => {
  const webpackConfig = {
    target:  target.find(t => t === 'web'),
    mode: ENV,
    context: resolve(__dirname, './src[web-app]'),// Absolute path to the directory that contains the entry files  
    entry: { ...entry },//Where webpack looks to start building the bundle
    output: {...output},
    devtool: IS_DEV ?  'inline-source-map' : 'source-map',
    devServer: { ...devServer() },
    module:
    {
      // rules for modules (configure loaders, parser options, etc.)
      rules: [{ ...html }, { ...images }, { ...vectors }, { ...fonts }, { ...scss() }, { ...js() }, { ...data }, { ...json }, { ...xml}]
    },
    plugins: [...plugins()], 
    optimization: { ...optimizations() },
  }

  console.log(webpackConfig.mode);
  return webpackConfig;
}
