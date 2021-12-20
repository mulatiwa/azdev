import graphql from "graphql";
import Approach from "./approach.js";
import UserError from "./user-error.js";
const { GraphQLList, GraphQLNonNull, GraphQLObjectType } = graphql

const ApproachPayload = new GraphQLObjectType(
  {
    name: 'ApproachPayload',
    fields: () =>(
      {
        errors:
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))),
        },
        approach: { type: Approach },
      }
    )
  }
);

export default ApproachPayload;