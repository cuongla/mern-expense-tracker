import express, { Router } from 'express';
import { 
    averageCategories, 
    createExpense, 
    currentMonthPreview, 
    expenseByCategory, 
    getExpenseId, 
    getExpensesByUser, 
    plotExpenses, 
    removeExpense, 
    updateExpense, 
    yearlyExpenses,
    hasAuthorization
} from '../controllers/expense.controller';
import { isLoggedIn } from '../controllers/auth.controllers';

// router
const router: Router = express.Router();

/**
 * @ GET
 * @ Get review of the current month
 */
router.route('/expenses/current/preview')
    .get(isLoggedIn, currentMonthPreview);

/**
* @ GET
* @ Get expenses by category
*/
router.route('/expenses/by/category')
    .get(isLoggedIn, expenseByCategory)

/**
 * @ GET
 * @ Get list of plotting expenses
 */
router.route('/expenses/plot')
    .get(isLoggedIn, plotExpenses)

/**
* @ GET
* @ Get get the average of the categories
*/
router.route('/expenses/category/averages')
    .get(isLoggedIn, averageCategories)

/**
* @ GET
* @ Get yearly expenses
*/
router.route('/expenses/yearly')
    .get(isLoggedIn, yearlyExpenses);

/**
* @ GET | POST
* @ Get list expenses from users and create new expense
*/
router.route('/expenses')
    .post(isLoggedIn, createExpense)
    .get(isLoggedIn, getExpensesByUser)

/**
* @ PUT | DELETE
* @ Delete epxense | Update expense
*/
router.route('/expenses/:expenseId')
    // .get(isLoggedIn, read)
    .put(isLoggedIn, hasAuthorization, updateExpense)
    .delete(isLoggedIn, hasAuthorization, removeExpense)

/**
* @ PARAM
* @ Get Expense Id
*/
router.param('expenseId', getExpenseId)

export default router;