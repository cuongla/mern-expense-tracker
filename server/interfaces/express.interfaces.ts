import { Request } from 'express';
import { Document } from 'mongoose';
import { ExpenseModel } from './expense.interfaces';
import { UserModel } from './user.interfaces';

interface RequestBody extends UserModel {
    token: string
    recorded_by: string
}

export interface IRequest extends Request {
    body: RequestBody
    auth: Document
    profile: UserModel
    expense: ExpenseModel
    query: {
        month: string
        year: string
        firstDay: string
        lastDay: string
    }
}