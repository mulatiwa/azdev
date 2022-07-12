import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { IS_DEV } from '../env-variables/env-var[app].js';
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory

export default{
  app:
  {
    import: [resolve(__dirname,  '../src[web-app]/index[web-app].jsx')],
    filename: `${IS_DEV}` ? 'js/client/index[web-app].bundle.js' : 'js/client/index[[web-app].bundle-min.[contenthash].js',
  },
  // 'shared-vendors': ['' ''], //  Shared Libraries
  // 'react-vendors': ['react', 'react-dom'], //  React Libraries
  // 'functional-vendors': [''], //  Functional Libraries
  // 'node-vendors': [''], //  Node Libraries

}