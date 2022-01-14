import dotenv from 'dotenv';
import { isDev } from './app-config.js';

// TODO: check env variables existence
dotenv.config();

//  MongoDB
const mdbUser = Number(process.env.MONGO_USER);
const mdbPWD = Number(process.env.MONGO_PWD);
const mdbDatabase = Number(process.env.MONGO_DB);
const collectionName = Number(process.env.MONGO_COLLECTION);
const mdbPort = Number(process.env.MONGO_PORT);
const mdbURI = (isDev === 'development') ? `mongodb://${process.env.Host}:${process.env.MONGO_PORT}/?readPreference=primary&ssl=false` : `mongodb+srv://<${process.env.MONGO_USER}>:<${process.env.MONGO_PWD}>@<cluster-url>?retryWrites=true&w=majority`; //-- Connection URI

export { mdbUser, mdbPWD, mdbDatabase, collectionName, mdbPort, mdbURI };

