import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios";
import {PostType} from "./types";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await axios.get<PostType[]>('/posts')
        return response.data
    }
)