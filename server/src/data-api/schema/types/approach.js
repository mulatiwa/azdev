import graphql from "graphql";
import User from "./user.js";
const { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLNonNull, GraphQLString } = graphql;

const Approach = new GraphQLObjectType(
  {
    name: 'Approach',
    fields:
    {
      id: { type: new GraphQLNonNull(GraphQLID)},
      createdAt: 
      {
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ createdAt }) => createdAt.toISOString(),
      },
      content: { type: new GraphQLNonNull(GraphQLString)},
      voteCount: { type: new GraphQLNonNull(GraphQLInt) },
      author: 
      {
        type: new GraphQLNonNull(User),
        resolve: (source, args, { pgAPI }) => pgAPI.userInfo(source.userId),
      }

    }
  }
);

export default Approach;