import mongoose from 'mongoose';
import { NextFunction, Response } from 'express';
import Expense from '../models/expense.model';
import errorHandler from '../utils/dbErrorHandler';
import extend from 'lodash/extend';
import { IRequest } from '../interfaces/express.interfaces';

export const createExpense = async (req: IRequest, res: Response) => {
    try {
        req.body.recorded_by = req.auth._id;

        // create new expense
        const expense = new Expense(req.body);
        await expense.save();

        return res.status(200).json({
            message: "Expense recorded!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const getExpense = (req: IRequest, res: Response) => {
    return res.status(200).json(req.expense);
};

export const getExpensesByUser = async (req: IRequest, res: Response) => {
    let firstDay = req.query.firstDay;
    let lastDay = req.query.lastDay;

    try {
        let expenses = await Expense.find({
            // @ts-ignore
            $and: [
                {
                    incurred_on: {
                        $gte: firstDay,
                        $lte: lastDay
                    },
                },
                {
                    recorded_by: req.auth._id,
                }
            ]
        })
            .sort('incurred_on')
            .populate('recorded_by', '_id name');

        res.status(200).json(expenses);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const currentMonthPreview = async (req: IRequest, res: Response) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const tomorrow = new Date();
    tomorrow.setUTCHours(0, 0, 0, 0);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date();
    yesterday.setUTCHours(0, 0, 0, 0);
    yesterday.setDate(yesterday.getDate() - 1);

    try {
        let currentPreview = await Expense.aggregate([
            {
                $facet: {
                    month: [
                        {
                            $match: {
                                incurred_on: {
                                    $gte: firstDay,
                                    $lt: lastDay
                                },
                                recorded_by: mongoose.Types.ObjectId(req.auth._id)
                            }
                        },
                        {
                            $group: {
                                _id: "currentMonth",
                                totalSpent: { $sum: "$amount" }
                            }
                        },
                    ],
                    today: [
                        {
                            $match: {
                                incurred_on: {
                                    $gte: today,
                                    $lt: tomorrow
                                },
                                recorded_by: mongoose.Types.ObjectId(req.auth._id)
                            }
                        },
                        {
                            $group: {
                                _id: "today",
                                totalSpent: { $sum: "$amount" }
                            }
                        },
                    ],
                    yesterday: [
                        {
                            $match: {
                                incurred_on: {
                                    $gte: yesterday,
                                    $lt: today
                                },
                                recorded_by: mongoose.Types.ObjectId(req.auth._id)
                            }
                        },
                        {
                            $group: {
                                _id: "yesterday",
                                totalSpent: { $sum: "$amount" }
                            }
                        },
                    ]
                }
            }])
        let expensePreview = { month: currentPreview[0].month[0], today: currentPreview[0].today[0], yesterday: currentPreview[0].yesterday[0] }
        res.json(expensePreview)
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const expenseByCategory = async (req: IRequest, res: Response) => {
    const date = new Date(), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    try {
        let categoryMonthlyAvg = await Expense.aggregate([
            {
                $facet: {
                    average: [
                        {
                            $match: {
                                recorded_by: mongoose.Types.ObjectId(req.auth._id)
                            }
                        },
                        {
                            $group: {
                                _id: {
                                    category: "$category",
                                    month: { $month: "$incurred_on" }
                                },
                                totalSpent: { $sum: "$amount" }
                            }
                        },
                        {
                            $group: {
                                _id: "$_id.category",
                                avgSpent: { $avg: "$totalSpent" }
                            }
                        },
                        {
                            $project: {
                                _id: "$_id",
                                value: { average: "$avgSpent" }
                            }
                        }
                    ],
                    total: [
                        {
                            $match: {
                                incurred_on: {
                                    $gte: firstDay,
                                    $lte: lastDay
                                },
                                recorded_by: mongoose.Types.ObjectId(req.auth._id)
                            }
                        },
                        {
                            $group: {
                                _id: "$category",
                                totalSpent: { $sum: "$amount" }
                            }
                        },
                        {
                            $project: {
                                _id: "$_id",
                                value: { total: "$totalSpent" },
                            }
                        }
                    ]
                }
            },
            {
                $project: {
                    overview: { $setUnion: ['$average', '$total'] },
                }
            },
            { $unwind: '$overview' },
            { $replaceRoot: { newRoot: "$overview" } },
            { $group: { _id: "$_id", mergedValues: { $mergeObjects: "$value" } } }
        ])
            .exec();

        res.status(200).json(categoryMonthlyAvg);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const averageCategories = async (req: IRequest, res: Response) => {
    const firstDay = new Date(req.query.firstDay);
    const lastDay = new Date(req.query.lastDay);

    try {
        let categoryMonthlyAvg = await Expense.aggregate([
            {
                $match: {
                    incurred_on: {
                        $gte: firstDay,
                        $lte: lastDay
                    },
                    recorded_by: mongoose.Types.ObjectId(req.auth._id)
                }
            },
            {
                $group: {
                    _id: { category: "$category" },
                    totalSpent: { $sum: "$amount" }
                }
            },
            {
                $group: {
                    _id: "$_id.category",
                    avgSpent: { $avg: "$totalSpent" }
                }
            },
            {
                $project: {
                    x: '$_id',
                    y: '$avgSpent'
                }
            }
        ]).exec();

        res.status(200).json({ monthAVG: categoryMonthlyAvg });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const yearlyExpenses = async (req: IRequest, res: Response) => {
    const y = Number(req.query.year);
    const firstDay = new Date(y, 0, 1);
    const lastDay = new Date(y, 12, 0);
    try {
        let totalMonthly = await Expense.aggregate([
            {
                $match: {
                    incurred_on: { $gte: firstDay, $lt: lastDay },
                    recorded_by: mongoose.Types.ObjectId(req.auth._id)
                }
            },
            {
                $group: {
                    _id: { $month: "$incurred_on" },
                    totalSpent: { $sum: "$amount" }
                }
            },
            {
                $project: {
                    x: '$_id',
                    y: '$totalSpent'
                }
            }
        ]).exec();

        res.status(200).json({ monthTot: totalMonthly });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const plotExpenses = async (req: IRequest, res: Response) => {
    const date = new Date(req.query.month), y = date.getFullYear(), m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    try {
        let totalMonthly = await Expense.aggregate([
            {
                $match: {
                    incurred_on: { $gte: firstDay, $lt: lastDay },
                    recorded_by: mongoose.Types.ObjectId(req.auth._id)
                }
            },
            {
                $project: {
                    x: {
                        $dayOfMonth: '$incurred_on'
                    },
                    y: '$amount'
                }
            }
        ]).exec();

        res.status(200).json(totalMonthly);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const updateExpense = async (req: IRequest, res: Response) => {
    try {
        let expense = req.expense;
        expense = extend(expense, req.body);
        expense.updated = Date.now();
        await expense.save();
        res.status(201).json(expense);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const removeExpense = async (req: IRequest, res: Response) => {
    try {
        let expense = req.expense;
        let deletedExpense = await expense.remove();
        res.status(200).json(deletedExpense);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

export const hasAuthorization = (
    req: IRequest,
    res: Response,
    next: NextFunction
) => {
    const authorized = req.expense
        && req.auth
        && req.expense.recorded_by._id == req.auth._id;

    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        });
    };

    next();
}

export const getExpenseId = async (
    req: IRequest,
    res: Response,
    next: NextFunction,
    id: string
) => {
    try {
        let expense = await Expense.findById(id).populate('recorded_by', '_id name').exec()
        if (!expense)
            return res.status(400).json({
                error: "Expense record not found"
            })
        req.expense = expense
        next()
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}