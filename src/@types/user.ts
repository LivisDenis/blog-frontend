export type UserType = {
    _id?: string
    avatarUrl?: string
    createdAt?: string
    email?: string
    fullName: string
}

export type UserRegisterType = {
    email: string
    fullName: string
    password: string
}

export type UserLoginType = {
    email: string
    password: string
}

