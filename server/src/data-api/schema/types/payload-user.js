import graphql from 'graphql';
import UserError from './user-error.js';
import User from './user.js';
const { GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } = graphql;

const UserPayload = new GraphQLObjectType(
  {
    name: 'UserPayload',
    fields: () =>(
      {
        errors: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))) },
        user: { type: User },
        authToken: { type: GraphQLString },
      }
    )
  }
);

export default UserPayload;