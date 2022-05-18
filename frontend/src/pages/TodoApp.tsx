import { Navigate, Link, useNavigate } from "react-router-dom"
import { useUser } from "../App"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useAppSelector } from "../hooks/useAppSelector"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { Todos } from "../models/Todo.model"
import { loadTodos, removeTodo, toggleTodo } from "../store/slices/todo-slice"
import TodoList from "../components/TodoList"
import { Outlet } from "react-router-dom"

export default function CommentsApp() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const todos = useAppSelector<Todos | null>((state) => state.todoSlice.todos)

    useEffectUpdate(() => {
        dispatch(loadTodos())
    }, [])

    const onToggleTodo = async (id) => {
        await dispatch(toggleTodo(id))
    }

    const onEditTodo = async (id: string) => {
        navigate(`/todo/edit/${id}`)
    }

    const onRemoveTodo = async (id: string) => {
        await dispatch(removeTodo(id))
    }

    // Auth guard:
    const { loggedUser } = useUser()
    if (!loggedUser) return <Navigate to="/login?msg=Please login to see that page" />

    return (
        <main className="comments-page main-layout">
            <h1>Todos!</h1>
            <Link to="/todo/edit">Create todo</Link>
            {<TodoList onEditTodo={onEditTodo} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} todos={todos} />}
            <Outlet />
        </main>
    )
}