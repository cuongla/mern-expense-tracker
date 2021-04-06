export interface IUser {
    _id?: string
    name: string
    password?: string
    email?: string
    created?: Date
    updated?: Date | number
}


export interface IProfile extends IUser{
    error?: string
}