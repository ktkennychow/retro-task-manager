import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as z from 'zod'

const taskFormSchema = z.object({
  title: z.string().min(3).max(50),
  dueDate: z.date().min(new Date(), { message: 'Please use a future date' }),
  category: z.string(),
})

type TaskFormData = z.infer<typeof taskFormSchema>

interface TaskForm {
  onSubmit: (formData: TaskFormData) => void
}

const TaskForm = ({ onSubmit }: TaskForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({ resolver: zodResolver(taskFormSchema) })
  const submitHandler: SubmitHandler<TaskFormData> = (data) => {
    onSubmit(data)
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className='border-2 border-gray-900 p-2'>
      <input
        {...register('title')}
        className='bg-gray-200 w-full px-2'
        placeholder='New Tasks'
      />
      <p>{errors.title?.message}</p>

      <input
        type='date'
        {...register('dueDate', { valueAsDate: true })}
      />
      <p>{errors.dueDate?.message}</p>

      <select {...register('category')}>
        <option value='work'>Work</option>
        <option value='personal'>Personal</option>
        <option value='school'>School</option>
      </select>
      <p>{errors.category?.message}</p>

      <input
        type='submit'
        className='bg-zinc-500 p-1 text-white'
      />
    </form>
  )
}

export default TaskForm
