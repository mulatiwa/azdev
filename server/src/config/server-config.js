import dotenv from 'dotenv';

// TODO: check env variables existence
dotenv.config();

//  Environment
// export const env = process.env.NODE_ENV;
const env = 'development';
const isDev = env === 'development';
//  Host
const host = String(process.env.HOST);
//API Port
const port = Number(process.env.API_PORT);
//  MongoDB
const mongodbPort = Number(process.env.MONGODB_PORT);
const mongoURI = process.env.MONGO_URI;
//  PostgreSQL
const postgreSQLPort = Number(process.env.POSTGRESQL_PORT);
const pgUser = String(process.env.PG_USER);
const pgDB = String(process.env.PG_DB);
const pgPWD = String(process.env.PG_PWD);
const pgPort = Number(process.env.PG_PORT);

const pgURI = process.env.PG_URI;

/* PG_CONNECTION_STRING  = "postgres://postgres:password@localhost:5432/azdev"
MDB_CONNECTION_STRING = "mongodb://localhost:27017/azdev" */

export { isDev, host, port, pgDB, pgUser, pgPWD, pgPort };

