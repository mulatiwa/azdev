//Webpack
//Middleware
import bodyParser from 'body-parser'; //  Body Parser
import cors from 'cors'; //  CORS
//  DataLoader
import DataLoader from 'dataloader';
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
import mongoAPIWrapper from './db/mongoDB/mongo-api.js';
import pgAPIWrapper from './db/postgreSQL/pg-api.js';


const compiler = webpack(config);
const { graphqlHTTP } = graphql;

/* ****************************   APP   ****************************  */

async function server()
{ 
  const app = express();//  Express Server  
  const pgAPI = await pgAPIWrapper();
  const mongoAPI = await mongoAPIWrapper();

  //  Express Middleware
  app.use(cors());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
      // Tell express to use the webpack-dev-middleware and use the webpack.config.js configuration file as a base.
  app.use(
    webpackDevMiddleware(compiler,
      {
        publicPath: config.output.publicPath,
      }
    )
  );
  // server.use(morgan(morganString));

  app.use('/graphql', async (req, res) =>
  {
    const authToken = (req && req.headers && req.headers.authorization) ? req.headers.authorization.slice(7) : null;

    const currentUser = await pgAPI.userFromAuthToken(authToken);

    if (authToken && !currentUser) 
    {
      return res.status(401).send(
        {
          errors: [{ message: 'Invalid access token' }],
        }
      )
    }
    
    const loaders =
    {
      users: new DataLoader(userIds => pgAPI.usersInfo(userIds)),
      approachLists: new DataLoader(taskIds => pgAPI.approachLists(taskIds)),
      tasks: new DataLoader(taskIds => pgAPI.tasksInfo({ taskIds, currentUser })),
      tasksByTypes: new DataLoader(types => pgAPI.tasksByTypes(types)),
      searchResults: new DataLoader(searchTerms => pgAPI.searchResults({ searchTerms, currentUser })),
      detailLists: new DataLoader(approachIds => mongoAPI.detailLists(approachIds)),
      tasksForUsers: new DataLoader(userIds => pgAPI.tasksForUsers(userIds))
    };

    const mutators = { ...pgAPI.mutators, ...mongoAPI.mutators }

    graphqlHTTP(
      {
        schema,
        context: { loaders, mutators, currentUser },
        graphiql: { headerEditorEnabled: true },
        pretty: true,
        customFormatErrorFn: err =>{
          const errorReport =
          {
            message: err.message,
            locations: err.locations,
            stack: err.stack ? err.stack.split('\n') : [],
            path: err.path,
          };

          console.error('GraphQL Error', errorReport);
          
           return isDev ? errorReport :{ message: 'Oops! Something went wrong! :(' }
        },
      })(req, res);
  });

      // Serve the files on the following URI
  app.listen(port,  () => console.log(`App URI:  http://${host}:${port}/graphql`));

}

server();