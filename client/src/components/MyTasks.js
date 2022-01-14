import React, { useEffect, useState } from 'react';
import { useStore } from '../store.js';
import TaskSummary, { TASK_SUMMARY_FRAGMENT } from './TaskSummary.js';


const MY_TASK_LIST = `
  query myTaskList{
    viewer{
      taskList{
        id
        ...TaskSummary
      }
    }
  }
  ${TASK_SUMMARY_FRAGMENT}
`

export default function MyTasks() {
  const { request } = useStore();
  const [myTaskList, setMyTaskList] = useState(null);

  useEffect(() => {
    request(MY_TASK_LIST)
      .then(({ data }) => setMyTaskList(data.viewer.taskList));    
  }, [request]);

  if (!myTaskList) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div>
        <h1>My Tasks</h1>
        {myTaskList.length === 0 && (
          <div className="box box-primary">
            You have not created any Task entries yet
          </div>
        )}
        {myTaskList.map((task) => (
          <TaskSummary key={task.id} task={task} link={true} />
        ))}
      </div>
    </div>
  );
}
