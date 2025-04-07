import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { boolean } from 'zod';

export interface User {
    id: number
    first_name: string
    middle_name: string
    last_name: string
    email: string
    home_address: string
    phone_number: string
    dob: Date
    avator?: string
}

export const fetchUser = createAsyncThunk(
    'user/list',
    () => {
        return new Promise<User>(async (resolve, reject) => {
            await fetch('/api/login', {
                method: 'GET'
            }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    resolve(res.user as User)
                }
            })
        })
    }
)

export const logout = createAsyncThunk(
    'user/logout',
    () => {
        return new Promise<boolean>(async (resolve, reject) => {
            await fetch('/api/logout', {
                method: 'GET'
            }).then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    toast("You were logged out successfully")
                    resolve(true)
                }
                if (res.error) {
                    toast(res.error)
                    reject()
                }
            })
            .catch((err) => {
                toast(err)
                reject()
            })
        })
    }
)

export interface UserState {
    user?: User | null
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(logout.fulfilled, (state, _) => {
            state.user = null;
        })
    }

})

export const { setUser } = userSlice.actions;