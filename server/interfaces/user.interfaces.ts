import { Document } from "mongoose";

export interface UserModel extends Document {
    name: string
    email: string
    salt: string;
    hashed_password: string
    password?: string
    updated: Date | Number
    created: Date
    authenticate(password: string);
}

