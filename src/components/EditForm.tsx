import { useEffect, useState } from "react";
import {  useGetSingleTaskQuery, useUpdateTaskMutation } from "../api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

  const initialState = {
    name: "",
    description: "",
    completed: false,
  };
function EditForm() {
    const [taskForm, setTaskForm] = useState(initialState);
     const {id} = useParams()
     const realId = parseInt(id ?? "")
    const { data } = useGetSingleTaskQuery(realId);
    const [updateTask]= useUpdateTaskMutation()  
    const navigate = useNavigate();
    

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      updateTask({id: realId, ...taskForm})
      navigate("/")
  /*     createNewTask(task) */
    };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setTaskForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setTaskForm(data ?? initialState);
  }, [realId, data]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={taskForm.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        value={taskForm.description}
        onChange={handleChange}
      />
      <input
        type="checkbox"
        name="completed"
        checked={taskForm.completed}
        onChange={handleChange}
      />
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditForm;
