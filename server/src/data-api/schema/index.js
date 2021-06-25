//  GraphQL
import graphql from 'graphql';
//  Types
import Task from './types/task.js';
const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLInt, GraphQLNonNull, printSchema } = graphql;

const QueryType = new GraphQLObjectType(
  {
    name: 'Query',
    fields:
    {
      taskMainList:{
        type: new GraphQLList(new GraphQLNonNull(Task)),
        resolve: async (source, args, { pgAPI}) => pgAPI.taskMainList()
      }
    }
  }
);

export const schema = new GraphQLSchema(
  {
    query: QueryType,
  }
);


/* console.log(printSchema(schema));// Generate SDL */