import graphql from 'graphql';
const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = graphql;

const UserError = new GraphQLObjectType(
  {
    name: 'UserError',
    fields: () =>(
      {
        message: { type: new GraphQLNonNull(GraphQLString)},
      }
    )
  }
);

export default UserError;