//Webpack
//Middleware
import bodyParser from 'body-parser'; //  Body Parser
import cors from 'cors'; //  CORS
//Express
import express from 'express';
//GraphQL
import graphql from 'express-graphql';
import morgan from 'morgan'; //  Morgan
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from '../webpack.dev.js';
//  Server Config
import { host, isDev, port } from './config/server-config.js';
//Schema
import { schema } from './data-api/schema/index.js';
import pgAPIWrapper from './db/postgreSQL/pg-api.js';
const compiler = webpack(config);
const { graphqlHTTP } = graphql;

/* ****************************   APP   ****************************  */

const app = express();//  Express Server

const server = async () =>
{ 
  const pgAPI = await pgAPIWrapper();
  //  Express Middleware
      // Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler,
      {
        publicPath: config.output.publicPath,
      }
    )
  );
  // server.use(morgan(morganString));
  

  app.use('/', graphqlHTTP(
    {
      schema,
      context: {pgAPI},
      graphiql: true,
      customFormatErrorFn: err =>{
        const errorReport =
        {
          message: err.message,
          locations: err.locations,
          stack: err.stack ? err.stack.split('\n') : [],
          path:  err.path,
        };
        console.error('GraphQL Error', errorReport);
        return isDev ? errorReport : { message: 'Oops! Something went wrong! :(' }
      }
    }
  ));

      // Serve the files on the following URI
  app.listen(port,  () => console.log(`App URI:  http://${host}:${port}/`));

}

server();