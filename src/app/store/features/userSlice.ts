import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';
import { boolean } from 'zod';
import { store } from '../store';

export interface User {
    id: number
    first_name: string
    middle_name: string
    last_name: string
    email: string
    home_address: string
    phone_number: string
    dob: Date,
    role: 'student' | 'tutor' | 'parent' | 'admin' | 'guest'
    avator?: string
    created_at: Date
    updated_at: Date
}

export const fetchUser = createAsyncThunk(
    'user/fetch',
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

export const listUsers = createAsyncThunk(
    'user/list',
    () => {
        return new Promise<User[]>(async (resolve, reject) => {
            const user = store.getState().user.user
            if (user?.role === 'admin') {
                await fetch('/api/users', {
                    method: 'GET'
                }).then((res) => res.json())
                .then((res) => {
                    if (res.success) {
                        resolve(res.data as User[])
                    }
                })
                .catch((err) => {
                    reject(err)
                })
            } else {
                toast("Permission Denied", {
                    style: {color: 'red'}
                })
                reject()
            }
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
    users?: User[] | null
}

const initialState: UserState = {
    user: null,
    users: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        reset: (state) => {
            state = {
                user: null,
                users: null
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addCase(listUsers.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(logout.fulfilled, (state, _) => {
            // state.user = null;
            reset();
        })
    }

})

export const { setUser, reset } = userSlice.actions;