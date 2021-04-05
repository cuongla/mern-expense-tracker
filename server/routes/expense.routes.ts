import express, { Router } from 'express';
import { averageCategories, createExpense, currentMonthPreview, expenseByCategory, getExpenseId, getExpensesByUser, plotExpenses, removeExpense, updateExpense, yearlyExpenses } from '../controllers/expense.controller';
import { hasAuthorization, isLoggedIn } from '../controllers/auth.controllers';

// router
const router: Router = express.Router();

/**
 * @ GET
 * @ Get review of the current month
 */
router.route('/api/expenses/current/preview')
    .get(isLoggedIn, currentMonthPreview);

/**
* @ GET
* @ Get expenses by category
*/
router.route('/api/expenses/by/category')
    .get(isLoggedIn, expenseByCategory)

/**
 * @ GET
 * @ Get list of plotting expenses
 */
router.route('/api/expenses/plot')
    .get(isLoggedIn, plotExpenses)

/**
* @ GET
* @ Get get the average of the categories
*/
router.route('/api/expenses/category/averages')
    .get(isLoggedIn, averageCategories)

/**
* @ GET
* @ Get yearly expenses
*/
router.route('/api/expenses/yearly')
    .get(isLoggedIn, yearlyExpenses);

/**
* @ GET | POST
* @ Get list expenses from users and create new expense
*/
router.route('/api/expenses')
    .post(isLoggedIn, createExpense)
    .get(isLoggedIn, getExpensesByUser)

/**
* @ PUT | DELETE
* @ Delete epxense | Update expense
*/
router.route('/api/expenses/:expenseId')
    // .get(isLoggedIn, read)
    .put(isLoggedIn, hasAuthorization, updateExpense)
    .delete(isLoggedIn, hasAuthorization, removeExpense)

/**
* @ PARAM
* @ Get Expense Id
*/
router.param('expenseId', getExpenseId)

export default router;