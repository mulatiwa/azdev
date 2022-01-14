import dotenv from 'dotenv';
import { host } from './app-config.js';

// TODO: check env variables existence
dotenv.config();

const client = process.env.CLIENT;

const clientEndPoint =`http://${host}:${client}`;//ClientEndpoint
const clientTitle = 'AZ-dev';

export { client, clientEndPoint, clientTitle };

