//  GraphQL
import graphql from 'graphql';
//  Query Types
import QueryType from './gqlQueries.js';
//  Types
const { GraphQLSchema  } = graphql;



export const schema = new GraphQLSchema(
  {
    query: QueryType,
  }
);


/* console.log(printSchema(schema));// Generate SDL */