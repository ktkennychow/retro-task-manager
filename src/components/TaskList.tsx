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
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Due Date</th>
          <th>Category</th>
          <th>WOW</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td>{task.title}</td>
            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
            <td>{task.category}</td>
            <td>
              <button onClick={() => onDelete(task.id)}>DELETE</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default TaskList
