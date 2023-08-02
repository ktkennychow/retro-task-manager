import { Task } from '../types'
import { FC } from 'react'

interface TaskListProps {
  tasks: Task[]
  onDelete: (taskId: string) => void
}

const TaskList: FC<TaskListProps> = ({ tasks, onDelete }) => {

  return !tasks ? (
    <p>No tasks yet.</p>
  ) : (
    <table className='w-full text-center border-2 border-gray-900 mt-2'>
      <thead>
        <tr className='border-2 border-gray-900'>
          <th>Title</th>
          <th>Due Date</th>
          <th>Category</th>
          <th>WOW</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr
            key={task.id}
            className='border-2 border-gray-900'>
            <td>{task.title}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.category}</td>
            <td>
              <button
                onClick={() => onDelete(task.id)}
                className='text-white p-1 bg-red-500'>
                DELETE
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskList
