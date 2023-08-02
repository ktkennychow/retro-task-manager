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
      <tr>
        <th>Title</th>
        <th>Due Date</th>
        <th>Category</th>
        <th>WOW</th>
      </tr>
      {tasks.map((task) => (
        <tr key={task.id}>
          <td>{task.title}</td>
          <td>{task.dueDate.toDateString()}</td>
          <td>{task.category}</td>
          <td>
            <button onClick={() => onDelete(task.id)}>DELETE</button>
          </td>
        </tr>
      ))}
    </table>
  )
}

export default TaskList
