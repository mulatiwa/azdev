import pgClient from "./pg-client.js";
import pgQueries from './queries/queries.js';

export default async function pgAPIWrapper()
{
  const  { pgPool } = await pgClient();

  const pgQuery = (text, params = {}) => pgPool.query(text, Object.values(params));

  return {
    taskMainList: async () =>{
      const pgResp = await pgQuery(pgQueries.tasksLatest);
      return pgResp.rows;
    },
    userInfo: async userID =>{
      const pgResp = await pgQuery(pgQueries.usersFromIds, { $1: [userID] });
      return pgResp.rows[0];
    },
    approachList: async taskID =>{
      const pgResp = await pgQuery(pgQueries.approachesForTaskIds, { $1: [taskID]});
      return pgResp.rows;
    }
  }
}