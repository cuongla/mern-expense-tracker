import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from '../../config';
import errorHandler from '../utils/dbErrorHandler';
import { IRequest } from '../interfaces/express.interfaces';
import User from '../models/user.model';
import { UserModel } from '../interfaces/user.interfaces';


export const register = async (req: IRequest, res: Response) => {
    try {
        const user: UserModel = new User(req.body);
        await user.save();
        return res.status(200).json({
            message: "Account has been created"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    };
};

export const login = async (req: IRequest, res: Response) => {
    try {
        let user: UserModel = await User.findOne({
            "email": req.body.email
        });

        if (!user) return res.status(401).json({
            error: "User not found"
        });

        if (!user.authenticate(req.body.password)) {
            return res.status(401).send({
                error: "Email and password don't match."
            });
        };

        // assign token
        const token = jwt.sign(
            { _id: user._id },
            config.jwtSecret
        );
        res.cookie("t", token, {
            expires: new Date()
        });

        return res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(401).json({
            error: "Could not sign in"
        });
    };
};

export const logout = (req: IRequest, res: Response) => {
    res.clearCookie("t")
    return res.status(200).json({
        message: "signed out"
    });
};

export const isLoggedIn = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256'],
});

export const hasAuthorization = (req: IRequest, res: Response, next: NextFunction) => {
    const authorization = req.profile
        && req.auth
        && req.profile._id == req.auth._id;

    if (!authorization) return res.status(403).json(
        { error: 'User is not authorized' });

    next();
}