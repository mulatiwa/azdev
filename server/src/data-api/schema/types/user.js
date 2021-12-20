import graphql from "graphql";
import Task from "./task.js";
const  { GraphQLID, GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList } = graphql;

const fieldsWrapper = ({ viewerScope }) =>
{
  const viewerFields =
  {
    id: { type: new GraphQLNonNull(GraphQLID) },
    username: {type: GraphQLString },
    name:
    {
      type: GraphQLString,
      resolve:({ firstName, lastName }) => [firstName, lastName].filter(Boolean).join(' ') 
    }  
  };

  if (viewerScope) 
  {
    viewerFields.taskList =
    {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(Task))),
      resolve: (source, args, { loaders, currentUser }) => loaders.tasksForUsers.load(currentUser.id),
    }  
  }

  return viewerFields;  
};

const User = new GraphQLObjectType(
  {
    name: 'User',
    fields: () => fieldsWrapper({ viewerScope: false }),
  }
);

export const Viewer = new GraphQLObjectType(
  {
    name: 'Viewer',
    fields: () => fieldsWrapper({ viewerScope: true } ),
  }
)

export default User