import { Todos } from "../models/Todo.model";
import TodoPreview from "./TodoPreview";

export default function TodoList({ todos, onToggleTodo, onRemoveTodo, onEditTodo }: { todos: Todos, onToggleTodo: (id: string) => void, onRemoveTodo: (id: string) => void, onEditTodo: (id: string) => void }) {

    return (
        <ul className="todo-list">
            {todos.length && todos.map(todo => <TodoPreview onRemoveTodo={onRemoveTodo} onEditTodo={onEditTodo} onToggleTodo={onToggleTodo} todo={todo} key={todo._id} />)}
        </ul>
    )
}