import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

const ApproachDetailCategory = new GraphQLEnumType(
  {
    name: 'ApproachDetailCategory',
    values:
    {
      NOTE: {},
      EXPLANATION: {},
      WARNING: {},
    }
  }
);

export default ApproachDetailCategory;