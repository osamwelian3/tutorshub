import { Action, configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => ThunkDispatch<RootState, null, Action<string>> = useDispatch

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>() // Export a hook that can be reused to resolve types

export const useAppSelector = useSelector.withTypes<RootState>()