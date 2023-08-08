export enum todosActionKind {
  ADD = 'ADD',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT',
}

export interface TodosAction {
  type: todosActionKind
  payload: any
}

export interface TodoItemProps {
  value: string
  isChecked: boolean
}
