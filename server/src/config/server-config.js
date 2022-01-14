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
const mongoURI = `mongodb://localhost:${process.env.MONGODB_PORT}/?readPreference=primary&ssl=false`;

//  PostgreSQL
const pgUser = String(process.env.PG_USER);
const pgDB = String(process.env.PG_DB);
const pgPWD = String(process.env.PG_PWD);
const pgPort = Number(process.env.PG_PORT);

export { isDev, host, port, pgDB, pgUser, pgPWD, pgPort, mongoURI };

