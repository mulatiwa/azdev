import graphql from 'graphql';
const { GraphQLEnumType } = graphql;

const ApproachDetailCategory = new GraphQLEnumType(
  {
    name: 'ApproachDetailCategory',
    values:
    {
      NOTE: { value: 'notes' },
      EXPLANATION: {value: 'explanations' },
      WARNING:  { value: 'warnings' },
    }
  }
);

export default ApproachDetailCategory;