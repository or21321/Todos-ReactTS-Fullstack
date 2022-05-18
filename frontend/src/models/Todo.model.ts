export interface Todo {
    _id: string
    createdAt: number
    content: string
    importance: number
    isDone: boolean
}

export type Todos = Todo[] 