import graphql from "graphql";
import ApproachDetailCategory from "./approach-detail-category.js";

const { GraphQLNonNull, GraphQLInputObjectType, GraphQLString  } = graphql

const ApproachDetailInput = new GraphQLInputObjectType(
  {
    name: 'ApproachDetailInput',
    fields: () =>(
      {
        content:{ type: new GraphQLNonNull(GraphQLString) },
        category: { type: new GraphQLNonNull(ApproachDetailCategory) },
      }
    )
  }
);

export default ApproachDetailInput;