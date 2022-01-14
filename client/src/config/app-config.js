import dotenv from 'dotenv';

// TODO: check env variables existence
dotenv.config();
//  Environment
const env = process.env.NODE_ENV;
const isDev = (env === 'development') ? 'development' : 'production';
const isProd = (env === 'production') ? 'production' : 'development';
//  App config
const host = (isProd === 'production') ? process.env.DOMAIN : process.env.DEV_Host;
// const publicKey = process.env.PUBLIC_KEY.toString();
// const privateKey = process.env.PRIVATE_KEY.toString();

export { isDev, isProd, host };

