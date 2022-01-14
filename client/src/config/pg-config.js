import dotenv from 'dotenv';

// TODO: check env variables existence
dotenv.config();

//  PostgreSQL
const  pgUser = String(process.env.PG_USER);
const  pgPWD = String(process.env.PG_PWD);
const  pgDB = String(process.env.PG_DB);
const  pgPort = String(process.env.PG_PORT);

 const pgURI = `klklkl`;

 export { pgUser, pgPWD, pgDB, pgPort, pgURI };

