import express, { Router } from 'express';
import { getUser, getUserId, getUsers, removeUser, updateUser } from '../controllers/user.controller';
import { hasAuthorization, isLoggedIn } from '../controllers/auth.controllers';


// router
const router: Router = express.Router();

/**
 * @ GET
 * @ Get list of users
 */
router.route('/users').get(getUsers);

/**
* @ GET | PUT | DELETE
* @ Get User Detail
* @ Update user
* @ Delete user
*/
router.route('/users/:userId')
    .get(isLoggedIn, getUser)
    .put(isLoggedIn, hasAuthorization, updateUser)
    .delete(isLoggedIn, hasAuthorization, removeUser);

/**
* @ PARAM
* @ Get User Id
*/
router.param('userId', getUserId);


export default router;