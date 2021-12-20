//  GraphQL
import graphql from 'graphql';
//  Query Types
import QueryType from './gqlQueries.js';
import MutationType from './types/mutations.js';
//  Types
const { GraphQLSchema  } = graphql;



export const schema = new GraphQLSchema(
  {
    query: QueryType,
    mutation: MutationType,
  }
);


/* console.log(printSchema(schema));// Generate SDL */