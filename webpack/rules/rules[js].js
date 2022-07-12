import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { DEV, ENV, IS_DEV } from '../../env-variables/env-var[app].js';
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory

export default () =>
{
  const rules_js = {
    test: /\.jsx?$/, 
    exclude: resolve(__dirname,  '../../node_modules/'),
    use:{
      loader: 'babel-loader',
      options:{
        presets:[
          [
            '@babel/preset-env',{ targets: { browsers: ['last 2 versions', '>1%', 'not dead'] },}
          ],          
          '@babel/preset-react',
        ]
      }      
    }
  };

  if (IS_DEV) 
  {
    rules_js.use.options.plugins = ['react-refresh/babel']
  }

  return rules_js;
}
