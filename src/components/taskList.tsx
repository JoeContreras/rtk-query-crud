import { useNavigate } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "../api/apiSlice";

function TaskList() {
  const navigate = useNavigate();
  const { data, isError, isLoading, error } = useGetTasksQuery();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }
  console.log(data);
  return (
    <ul>
      {data?.map((task) => (
        <li key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <button
            type="button"
            onClick={() => navigate(`/update/${task.id}`)}
          >
            Edit task
          </button>
          <button
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            Delete
          </button>
          <input
            checked={task.completed}
            onChange={(e) =>
              updateTask({ ...task, completed: e.target.checked })
            }
            type="checkbox"
            id={task.id.toString()}
          />
          <label htmlFor={task.id.toString()}>completed</label>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
