import { Request } from 'express';
import { Document } from 'mongoose';
import { UserModel } from './user.interfaces';

interface RequestBody extends UserModel {
    token: string
}

export interface IRequest extends Request {
    body: RequestBody
    auth: Document
    profile: UserModel
}