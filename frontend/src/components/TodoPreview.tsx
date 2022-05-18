import { useState } from "react";
import { Todo } from "../models/Todo.model";
import ActionsModal from "./ActionsModal";

export default function TodoPreview({ todo, onToggleTodo, onRemoveTodo, onEditTodo }: { todo: Todo, onToggleTodo: (id: string) => void, onRemoveTodo: (id: string) => void, onEditTodo: (id: string) => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    return (
        <li onClick={() => onToggleTodo(todo._id)} className={`todo-preview ${todo.isDone ? "done" : ""}`}>
            <span>Task: {todo.content}</span>
            <span>Importance: {todo.importance}</span>  
            <span>Is done: {JSON.stringify(todo.isDone)}</span>
            <button onClick={(ev) => { ev.stopPropagation(); toggleModal() }}>Actions</button >
            {isModalOpen && <ActionsModal onEditTodo={() => onEditTodo(todo._id)} onRemoveTodo={() => onRemoveTodo(todo._id)} toggle={toggleModal} />}
        </li >
    )
}