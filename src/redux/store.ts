import { configureStore } from "@reduxjs/toolkit"
import {useDispatch} from "react-redux";
import postsSlice from "./posts/slice";

export const store = configureStore({
    reducer: {
        postsSlice
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch