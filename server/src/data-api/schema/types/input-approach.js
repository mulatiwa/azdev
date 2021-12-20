import graphql from "graphql";
import ApproachDetailInput from "./input-approach-detail.js";
const { GraphQLNonNull, GraphQLInputObjectType, GraphQLString, GraphQLList  } = graphql

const ApproachInput = new GraphQLInputObjectType(
  {
    name: 'ApproachInput',
    fields: () =>(
      {
        content:{ type: new GraphQLNonNull(GraphQLString) },
        detailList: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ApproachDetailInput))) },
      }
    )
  }
);

export default ApproachInput;