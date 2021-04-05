import { Document } from "mongoose";
import { UserModel } from "./user.interfaces";

export interface ExpenseModel extends Document {
    title: string
    category: string
    amount: string
    incurred_on: Date | number 
    notes: string
    updated: Date | number 
    created: Date | number
    recorded_by: UserModel
}
