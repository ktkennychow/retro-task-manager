import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from './types'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const handleAddTask = (task: Omit<Task, 'id'>) => {
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: task.title,
        dueDate: task.dueDate,
        category: task.category,
      },
    ])
  }
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}

export default App
