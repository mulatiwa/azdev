import graphql from "graphql";
import Task from "./task.js";
import UserError from "./user-error.js";
const { GraphQLList, GraphQLNonNull, GraphQLObjectType } = graphql;

const TaskPayload =new GraphQLObjectType(
  {
    name: 'TaskPayload',
    fields: () =>(
      {
        errors: 
        {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserError))),
        },
        task: { type: Task },
      }
    )
  }
);

export default TaskPayload;