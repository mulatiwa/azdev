import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default () =>
{
  return {
    target: 'web',/*
    (1) 'web' | 'node
    (2) the environment in which the bundle should run
    (3) changes chunk loading behavior and available modules*/
    entry:
    {
      main: path.resolve(__dirname, './src/index.jsx'),
    },/*
    (1) string | object | array
    (2) defaults to ./src
    (3) Here the application starts executing
    (4) and webpack starts bundling*/
    module:
    { //configuration regarding modules
      rules:
      [// rules for modules (configure loaders, parser options, etc.)
        {// HTML
          test: /\.html$/,
          use:
          [ // apply multiple loaders and options
            {
              loader: "html-loader",
            }
          ]
        },
        {// Images
          test: /\.(png|jpe?g|gif)$/i, 
          type: 'asset/resource',
          generator:
          {
            filename: 'assets/imgs/[name][hash][ext][query]'
          },
        },
        {//SVG
          test: /\.svg$/i, 
          type: 'asset/resource',
          generator:
          {
            filename: 'assets/svg/[name][hash][ext][query]'
          },
        },
        {//Fonts
          test: /\.(woff|woff2|eot|ttf|otf|)$/i,
          type: 'asset/resource',
          generator:
          {
            filename: 'assets/fonts/[name][hash][ext][query]'
          },
        },
        {//Data - csv & tsv
          test: /\.(csv|tsv)$/i,
          use:
          [
            'csv-loader',          
          ],        
        },
      ]
    },
  }
}

