import graphql from "graphql";
import UserError from "./user-error.js";
const { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } = graphql

const UserDeletePayload = new GraphQLObjectType(
  {
    name: 'UserDeletePayload',
    fields: () =>(
      {
        errors: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))) },
        deletedUserId: { type: GraphQLID},
      }
    )
  }
);

export default UserDeletePayload;