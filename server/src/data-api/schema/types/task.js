import graphql from "graphql";
import Approach from "./approach.js";
import SearchResultItem from "./search-result-item.js";
import User from "./user.js";
const  { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } = graphql;


const Task = new GraphQLObjectType(
  {
    name: 'Task',
    interfaces: () => [SearchResultItem],
    fields: () =>(
      {
        id:{ type: new GraphQLNonNull(GraphQLID) },
        createdAt:
        {
          type: new GraphQLNonNull(GraphQLString) ,
          resolve: source => source.createdAt.toISOString(),
        },
        content: { type: new GraphQLNonNull(GraphQLString)},
        approachCount: { type: new GraphQLNonNull(GraphQLInt)},
        author:
        {
          type: new GraphQLNonNull(User),
          resolve: (source, args, { loaders }) =>loaders.users.load(source.userId),
        },
        approachList:
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
          resolve: (source, args, { loaders }) => loaders.approachLists.load(source.id),
        },
        tags:
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
          resolve: source => source.tags.split(','),
        },
      }
    )
  }
);

export default Task;