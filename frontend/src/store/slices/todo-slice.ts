import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import type { RootState } from '..'
import { Todo, Todos } from '../../models/Todo.model'
import { todoService } from '../../services/todo.service'

export interface TodoState {
    todos: Todos,
    currTodo: Todo | null
}

const initialState: TodoState = {
    todos: [],
    currTodo: null
}

export const loadTodos = createAsyncThunk(
    'LOAD_TODOS',
    async () => {
        return await todoService.query()
    }
)

export const toggleTodo = createAsyncThunk(
    'TOGGLE_TODO',
    async (id: string) => {
        return await todoService.toggleTodo(id)
    }
)

export const removeTodo = createAsyncThunk(
    'REMOVE_TODO',
    async (id: string) => {
        await todoService.remove(id)
        return id
    }
)

export const saveTodo = createAsyncThunk(
    'SAVE_TODO',
    async (todo: Todo) => {
        try {
            return await todoService.save(todo)
        } catch (err) {
            console.log(err);
            toast.warn('Maximum tasks amount is 10 - delete some to create', {
                position: 'bottom-right'
            })
            throw err
        }
    }
)

export const todoSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(loadTodos.fulfilled, (state, action) => {
            state.todos = action.payload
        })
        builder.addCase(toggleTodo.fulfilled, (state, action) => {
            const todo = action.payload
            const idx = state.todos.findIndex(t => t._id === todo._id)
            if (idx !== -1) state.todos.splice(idx, 1, todo)
        })
        builder.addCase(removeTodo.fulfilled, (state, action) => {
            const todoId = action.payload
            const idx = state.todos.findIndex(t => t._id === todoId)
            if (idx !== -1) state.todos.splice(idx, 1)
        })
        builder.addCase(saveTodo.fulfilled, (state, action) => {
            console.log('action.payload',action.payload);
            
            const todo = action.payload
            const idx = state.todos.findIndex(t => t._id === todo._id)
            if (idx !== -1) state.todos.splice(idx, 1, todo)
            else if (state.todos.length >= 10) throw Error('Maximum tasks, delete some to create')
            else state.todos.push(todo)
        })
    },
})


// Other code such as selectors can use the imported `RootState` type
// export const boards = (state: RootState) => state.boardSlice.boards

export default todoSlice.reducer