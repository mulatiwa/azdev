import graphql from 'graphql';
import Approach from './approach.js';
import User from './user.js';
const {  GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } = graphql;

const Task = new GraphQLObjectType(
  {
    name: 'Task',
    fields:
    {
      id: { type: new GraphQLNonNull(GraphQLID)},
      createdAt: 
      {
        type: new GraphQLNonNull(GraphQLString),
        resolve : source => source.createdAt.toISOString(),
      },
      content: { type: new GraphQLNonNull(GraphQLString)},
      approachCount: { type: new GraphQLNonNull(GraphQLInt)},
      tags: 
      {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLString))),
        resolve: source => source.tags.split(','),
      },
      author:
      {
        type: new GraphQLNonNull(User),
        resolve: (source, args, { pgAPI }) => pgAPI.userInfo(source.userId)
      },
      approachList:
      {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Approach))),
        resolve: (source, args, { pgAPI }) => pgAPI.approachList(source.id),
      }
    }
  }
);

export default Task;