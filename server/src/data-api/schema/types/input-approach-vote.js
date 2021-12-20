import graphql from "graphql";
const { GraphQLBoolean, GraphQLNonNull, GraphQLInputObjectType } = graphql

const ApproachVoteInputType = new GraphQLInputObjectType(
  {
    name: 'ApproachVoteInput',
    description: 'true for up-vote and false for down-vote',
    fields: () =>(
      {
        up: { type: new GraphQLNonNull(GraphQLBoolean) }
      }
    )
  }
);

export default ApproachVoteInputType;