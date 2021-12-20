import graphql from 'graphql';
import UserError from './user-error.js';
const { GraphQLList,GraphQLInputObjectType, GraphQLNonNull, GraphQLString } = graphql;

const UserInput = new GraphQLInputObjectType(
  {
    name: 'UserInput',
    fields: () =>(
      {
        username: { type: new GraphQLNonNull(GraphQLString)},
        password: { type: new GraphQLNonNull(GraphQLString)},
        firstName: { type:GraphQLString },
        lastNAme: { type:GraphQLString },
      }
    )
  }
);

export default UserInput;