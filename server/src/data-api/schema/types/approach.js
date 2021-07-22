import graphql from "graphql";
import ApproachDetailCategory from "./approach-detail-category.js";
import ApproachDetail from "./approach-detail.js";
import SearchResultItem from "./search-result-item.js";
import Task from "./task.js";
import User from "./user.js";
const { GraphQLID, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLList } = graphql;


const Approach = new GraphQLObjectType(
  {
    name: 'Approach',
    interfaces: () => [SearchResultItem],
    fields: () =>(
      {
        id: { type: new GraphQLNonNull(GraphQLID)},
        createdAt:
        {
          type: new GraphQLNonNull(GraphQLString),
          resolve: ({ createdAt }) => createdAt.toISOString(),
        },
        content: { type: new GraphQLNonNull(GraphQLString) },
        task:
        {
          type: new GraphQLNonNull(Task),
          resolve: (source, args, { loaders }) => loaders.tasks.load(source.taskId),
        },
        voteCount: { type: new GraphQLNonNull(GraphQLInt) },
        author:
        {
          type: new GraphQLNonNull(User),
          resolve: (source, args, { loaders }) => loaders.users.load(source.userId),
        },
        detailList: 
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ApproachDetail))),
          resolve: (source, args, { loaders }) => loaders.detailLists.load(source.id),
        }
      }
    )
  }
);

export default Approach;