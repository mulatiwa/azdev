import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { HOST, IS_DEV } from "../env-variables/env-var[app].js";
import { CLIENT_PORT } from "../env-variables/env-var[client].js";
const __filename = fileURLToPath(import.meta.url);//  Absolute path to  current file

const __dirname = dirname(__filename);//  Absolute path to current directory

export default () =>
{
  const devServer = { };

  if(IS_DEV)
  {
    devServer.host = HOST;
    devServer.port = CLIENT_PORT;
    // devServer.open = true;
    devServer.historyApiFallback = true;
    devServer.liveReload = true;
    devServer.compress = true;
    devServer.static = {
      directory: resolve(__dirname,  '../app')
    };
    devServer.client = {
      progress: true,
      overlay: true,
      logging: 'info',
    };
  }

  return devServer;
}