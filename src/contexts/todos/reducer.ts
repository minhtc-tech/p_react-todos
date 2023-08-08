import { TodoItemProps, TodosAction, todosActionKind } from './type'

export const todosReducer = (todos: TodoItemProps[], action: TodosAction) => {
  switch (action.type) {
    case todosActionKind.ADD: {
      return [
        ...todos,
        {
          value: action.payload.value,
          isChecked: false,
        } as TodoItemProps,
      ]
    }

    case todosActionKind.REMOVE: {
      return todos.filter(
        (_: TodoItemProps, index: number) => index !== action.payload.index,
      )
    }

    case todosActionKind.EDIT: {
      return todos.map((item: TodoItemProps, index: number) =>
        index === action.payload.index
          ? ({
              value: action.payload.value,
              isChecked: action.payload.isChecked,
            } as TodoItemProps)
          : item,
      )
    }
  }
}
