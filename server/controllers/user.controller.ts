import { Response, NextFunction } from 'express';
import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from '../utils/dbErrorHandler';
import config from '../../config';
import { IRequest } from '../interfaces/express.interfaces';
import { UserModel } from '../interfaces/user.interfaces';


export const getUser = (req: IRequest, res: Response) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.status(200).json(req.profile);
};

export const getUsers = async (req: IRequest, res: Response) => {
    try {
        let users: UserModel[] = await User.find().select('name email updated created');

        res.status(200).json(users);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    };
};

export const updateUser = async (req: IRequest, res: Response) => {
    try {
        let user = req.profile;
        user = extend(user, req.body); // update user
        user.updated = Date.now();
        await user.save(); // save user

        user.hashed_password = undefined;
        user.salt = undefined;

        res.status(200).json(user);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    };
};

export const removeUser = async (req: IRequest, res: Response) => {
    try {
        let user = req.profile;
        let deletedUser = await user.remove();

        deletedUser.hashed_password = undefined;
        deletedUser.salt = undefined;

        res.status(200).json(deletedUser);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    };
};

export const getUserId = async (req: IRequest, res: Response, next: NextFunction, id: string) => {
    try {
        let user: UserModel = await User.findById(id);

        if (!user)
            return res.status(400).json({
                error: "User not found"
            });

        req.profile = user;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve user"
        });
    };
};