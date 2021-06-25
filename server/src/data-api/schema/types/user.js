import graphql from "graphql";
const  { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType } = graphql;

const User = new GraphQLObjectType(
  {
    name: 'User',
    fields:
    {
      id: { type: new GraphQLNonNull(GraphQLID) },
      username: {type: GraphQLString },
      name:
      {
        type: new GraphQLNonNull(GraphQLString),
        resolve: ({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' '),
      }
    }
  }
);

export default User