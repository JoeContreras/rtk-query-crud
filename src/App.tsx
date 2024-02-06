import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import TaskForm from './components/TaskForm'
import EditForm from './components/EditForm'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<TaskForm />} />
      <Route path="update/:id" element={<EditForm />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
