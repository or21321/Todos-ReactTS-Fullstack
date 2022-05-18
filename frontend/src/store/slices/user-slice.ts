import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { Credentials } from '../../models/Credentials.model'
import { User } from '../../models/User.model'
import { authService } from '../../services/auth.service'

export interface UserState {
    loggedUser: User | null,
}

const initialState: UserState = {
    loggedUser: null,
}

export const login = createAsyncThunk(
    'LOGIN',
    async (credentials: Credentials) => {
        await authService.login(credentials)
        return await authService.getLoggedUser()
    }
)

export const logout = createAsyncThunk(
    'LOGOUT',
    async () => {
        return await authService.logout()
    }
)

export const userSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.loggedUser = action.payload

        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loggedUser = null
        })
    },
})


// Other code such as selectors can use the imported `RootState` type
// export const loggedUser = (state: RootState) => state.userSlice.loggedUser

export default userSlice.reducer