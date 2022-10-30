import {UserType} from "../../@types/user";

export type PostType = {
    _id: string
    imageUrl?: string
    createdAt: string
    tags: string[]
    text: string
    title: string
    user: UserType
    viewsCount: number
}

export enum PostSliceEnum {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

export type PostStateType = {
    posts: PostType[]
    status: PostSliceEnum
}