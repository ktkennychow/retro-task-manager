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
      className='border-2 border-gray-900 p-2 flex flex-col gap-1 w-full'>
      <input
        {...register('title')}
        className='bg-gray-200 px-2'
        placeholder='New Tasks'
      />
      <p className='text-red-500'>{errors.title?.message}</p>
      <div className='flex gap-2'>
        <input
          type='date'
          {...register('dueDate', { valueAsDate: true })}
          className='p-1 min-w-[45.5%]'
        />
        <p className='text-red-500'>{errors.dueDate?.message}</p>
      </div>
      <div className='flex gap-2'>
        <select
          {...register('category')}
          className='p-0.5 w-1/2'>
          <option value='work'>Work</option>
          <option value='personal'>Personal</option>
          <option value='school'>School</option>
        </select>
        <p className='text-red-500'>{errors.category?.message}</p>
      </div>

      <input
        type='submit'
        className='bg-zinc-500 py-1 px-2 text-white w-1/2'
      />
    </form>
  )
}

export default TaskForm
