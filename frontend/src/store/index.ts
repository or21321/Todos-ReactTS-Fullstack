import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user-slice'
import todoSlice from './slices/todo-slice'

export const store = configureStore({
    reducer: {
        userSlice,
        todoSlice
    },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch