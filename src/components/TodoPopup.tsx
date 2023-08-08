import clsx from 'clsx'
import { FormEvent, useState } from 'react'
import { useTodosDispatch } from '../contexts/todos'
import { TodoItemProps, todosActionKind } from '../contexts/todos/type'

interface TodoPopupProps {
  onClosePopup: () => void
  index: number | null
  data: TodoItemProps
}

const TodoPopup = ({ onClosePopup, index, data }: TodoPopupProps) => {
  const todosDispatch = useTodosDispatch()!
  const [todoValue, setTodoValue] = useState(data?.value || '')

  const handleEditTodoItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onClosePopup()

    if (index === null) {
      todosDispatch({
        type: todosActionKind.ADD,
        payload: {
          value: todoValue,
        },
      })

      return
    }

    todosDispatch({
      type: todosActionKind.EDIT,
      payload: {
        index,
        value: todoValue,
        isChecked: data.isChecked,
      },
    })
  }

  return (
    <div
      className={clsx(
        'fixed bottom-0 left-0 right-0 top-0 z-50',
        'flex items-center justify-center bg-gray-700/60 p-4',
      )}
    >
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleEditTodoItem}
          className='rounded-lg bg-white shadow'
        >
          <div className='p-6'>
            <input
              required
              type='text'
              className={clsx(
                'w-full bg-gray-50 p-4',
                'rounded-lg border border-gray-300',
                'text-gray-900',
                'focus:border-blue-500 focus:ring-blue-500',
              )}
              placeholder='Add Todos'
              value={todoValue}
              onChange={(event) => setTodoValue(event.target.value)}
            />
          </div>

          <div
            className={clsx(
              'flex items-center justify-center space-x-8 p-4',
              'rounded-b border-t border-gray-200',
            )}
          >
            <button
              type='submit'
              className={clsx(
                'rounded-lg bg-emerald-700 px-5 py-2.5',
                'text-center font-medium text-white',
                'hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300',
              )}
            >
              Save
            </button>
            <button
              onClick={onClosePopup}
              type='button'
              className={clsx(
                'bg-white px-5 py-2.5',
                'rounded-lg border border-gray-200',
                'font-medium text-gray-500',
                'hover:bg-gray-100 hover:text-gray-900',
                'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200',
              )}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoPopup
