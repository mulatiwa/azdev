import graphql from 'graphql';
import ApproachVoteInputType from './input-approach-vote.js';
import ApproachInput from './input-approach.js';
import AuthInput from './input-auth.js';
import TaskInput from './input-task.js';
import UserInput from './input-user.js';
import ApproachPayload from './payload-approach.js';
import TaskPayload from './payload-task.js';
import UserDeletePayload from './payload-user-delete.js';
import UserPayload from './payload-user.js';
const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = graphql;

const MutationType = new GraphQLObjectType(
  {
    name: 'Mutation',
    fields: () =>(
      {
        userCreate:
        {
          type: new GraphQLNonNull(UserPayload),
          args:
          {
            input: { type: new GraphQLNonNull(UserInput) }
          },
          resolve: async (source, { input }, { mutators }) => mutators.userCreate({ input })
        },
        userLogin:
        {
          type: new GraphQLNonNull(UserPayload),
          args:
          {
            input: { type: new GraphQLNonNull(AuthInput) },
          },
          resolve: async (source, { input }, { mutators }) => mutators.userLogin({ input }),
        },
        taskCreate:
        {
          type: TaskPayload,
          args:
          {
            input: { type: new GraphQLNonNull(TaskInput) },
          },
          resolve: async (source, { input }, { mutators, currentUser }) => mutators.taskCreate({ input, currentUser }),
        },
        approachCreate:
        {
          type: ApproachPayload,
          args:
          {
            taskId: { type: new GraphQLNonNull(GraphQLID) },
            input: { type: new GraphQLNonNull(ApproachInput) },
          },
          resolve: async (source, {taskId, input }, { mutators, currentUser }) => mutators.approachCreate({ taskId, input, currentUser, mutators })
        },
        approachVote:
        {
          type: ApproachPayload,
          args:
          {
            approachId: { type: new GraphQLNonNull(GraphQLID) },
            input: { type: new GraphQLNonNull(ApproachVoteInputType) },
          },
          resolve: async (source, { approachId, input }, { mutators }) => mutators.approachVote({approachId, input})
        },
        userDelete:
        {
          type: UserDeletePayload,
          resolve: async (source, args, { mutators, currentUser }) => mutators.userDelete({ currentUser }),
        }
      }
    )
  }
);

export default MutationType;