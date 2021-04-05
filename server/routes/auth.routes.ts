import express, { Router } from 'express';
import {
    register,
    login,
    logout
} from '../controllers/auth.controllers';


// router
const router: Router = express.Router();

/**
 * @ POST
 * @ Logging in user
 */
router.route('/auth/signup').post(register);

/**
 * @ POST
 * @ Logging in user
 */
router.route('/auth/signin').post(login);

/**
* @ GET
* @ Logging out user
*/
router.route('/auth/signout').get(logout);


export default router;