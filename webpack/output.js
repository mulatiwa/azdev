import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { IS_DEV } from '../env-variables/env-var[app].js';
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file
const __dirname = dirname(__filename);//  Absolute path to current directory


export default{
  path: resolve(__dirname,  '../app'),// Folder to store generated files
  publicPath: IS_DEV ? '/' : './', // or /
  pathinfo: true,
  clean: IS_DEV ? false : true,
}