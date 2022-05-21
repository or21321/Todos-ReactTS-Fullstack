import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useFormRegister } from "../hooks/useFormRegister.js"
import { todoService } from "../services/todo.service"
import { useEffectUpdate } from "../hooks/useEffectUpdate"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { saveTodo } from "../store/slices/todo-slice"

export default function TodoEdit() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [todoToEdit, register, setTodoToEdit] = useFormRegister(null)

    const onSubmit = async () => {
        await dispatch(saveTodo(todoToEdit))
        navigate('/todo')
    }

    const params = useParams()

    useEffectUpdate(() => {
        loadTodo()
    }, [params.id])

    const loadTodo = async () => {
        const { id } = params
        const todoToEdit = id ? await todoService.getById(id) : await todoService.getEmptyTodo()
        setTodoToEdit(todoToEdit)
    }

    const title = useRef(params.id ? 'Edit' : 'Add')

    return (
        <div onClick={() => navigate('/todo')} className="modal-wrapper">
            <section onClick={(ev) => ev.stopPropagation()} className="wrapped-modal todo-edit">
                <header>{title.current}</header>
                {todoToEdit &&
                    <form onSubmit={(ev) => { ev.preventDefault(); onSubmit() }}>
                        <label>
                            Task: <input type="text" {...register('content')} />
                        </label>
                        <label>
                            Importance: <input type="range" min="1" max="5" {...register('importance')} /> {todoToEdit.importance}
                        </label>
                        <button className="btn-submit">{title.current}</button>
                    </form>}
            </section>
        </div>
    )
}