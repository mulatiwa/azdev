//  GraphQL
import graphql from 'graphql';
import SearchResultItem from './types/search-result-item.js';
import Task from './types/task.js';
//  Types
const { GraphQLObjectType, GraphQLID, GraphQLString ,GraphQLList, GraphQLNonNull } = graphql;

const QueryType = new GraphQLObjectType(
  {
    name: 'Query',
    fields: () =>(
      {
        currentTime:
        {
          type: GraphQLString,
          resolve: () =>{
            const isoString = new Date().toISOString();
            return isoString.slice(11, 19);
          }
        },
        taskMainList:
        {
          type: new GraphQLList(new GraphQLNonNull(Task)),
          resolve: async (source, args, { loaders }) => loaders.tasksByTypes.load('latest') ,
        },
        taskInfo:
        {
          type: Task,
          args:
          {
            id: { type: new GraphQLNonNull(GraphQLID)},
          },
          resolve: async (source, { id }, { loaders }) =>loaders.tasks.load(id),
        },
        search:
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SearchResultItem))),
          args: { term: { type: new GraphQLNonNull(GraphQLString) } },
          resolve: async (source, { term }, { loaders }) => loaders.searchResults.load(term),
        }
      }
    )
  }
);

export default QueryType;