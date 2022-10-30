import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchPosts } from "./AsyncActions";
import {PostSliceEnum, PostStateType, PostType} from "./types";


const initialState: PostStateType = {
    posts: [],
    status: PostSliceEnum.LOADING
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        create: (state: PostStateType, action: PayloadAction<PostType>) => {
            state.posts.push(action.payload)
        },
        remove: (state: PostStateType, action: PayloadAction<string | undefined>) => {
            state.posts = state.posts.filter(post => post._id !== action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, state => {
            state.status = PostSliceEnum.LOADING
        })
        builder.addCase(fetchPosts.fulfilled, (state: PostStateType, action: PayloadAction<PostType[]>) => {
            state.posts = action.payload
            state.status = PostSliceEnum.SUCCESS
        })
        builder.addCase(fetchPosts.rejected, state => {
            state.status = PostSliceEnum.ERROR
        })
    },
})

const {actions, reducer} = postsSlice

export const {create, remove} = actions

export default reducer