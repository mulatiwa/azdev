import graphql from 'graphql';
import ApproachDetailCategory from './approach-detail-category.js';
const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = graphql;

const ApproachDetail = new GraphQLObjectType(
  {
    name: 'ApproachDetail',
    fields: () =>(
      {
        content: { type: new GraphQLNonNull(GraphQLString) },
        category: {type: new GraphQLNonNull(ApproachDetailCategory) },
      }
    )
  }
);

export default ApproachDetail;