import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Task } from './types'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  useEffect(() => {
    const localTasks = JSON.parse(localStorage.getItem('tasks') || '""')
    if (localTasks) {
      setTasks(localTasks)
    }
  }, [])

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks])

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
    <div className='max-w-3xl mx-auto'>
      <h1 className='font-title text-base md:text-xl bg-gray-200 p-2'>TASK MANAGER FOR NERDS</h1>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}

export default App
