export interface User {
    _id?: string
    name: string
    email?: string
    created?: Date
    seller?: Boolean
    stripe_seller?: any
    stripe_customer?: any
    stripe?: any
}

export interface UserState extends User{

}