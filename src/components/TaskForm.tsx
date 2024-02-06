import { useState } from "react";
import { useCreateTaskMutation } from "../api/apiSlice";
import TaskList from "./taskList";

const initialState = {
  name: "",
  description: "",
  completed: false,
};
function TaskForm() {
  const [task, setTask] = useState(initialState);
  const [createNewTask] = useCreateTaskMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createNewTask(task);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={task.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={task.description}
          onChange={handleChange}
        />
        <input
          type="checkbox"
          name="completed"
          checked={task.completed}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <TaskList />
    </>
  );
}

export default TaskForm;
