import dotenv from 'dotenv';
import { host } from './app-config.js';

// TODO: check env variables existence
dotenv.config();

//  API config
const api = process.env.SERVER;
const apiTitle = 'api'
const apiEndPoint =`http://${host}:${api}`;//API Endpoint
const gqlEndPoint =`http://${host}:${api}/graphql`;// gql Endpoint
const authEndpoint = `http://${host}:${api}/authorise`;//Authorisation Server Endpoint
const tokenEndpoint = `http://${host}:${api}/token`;//Token Server Endpoint

export { api, apiTitle, apiEndPoint, gqlEndPoint, authEndpoint, tokenEndpoint };

