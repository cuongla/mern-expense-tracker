import queryString from 'query-string';
import { IExpense, IExpenseFormData } from '../types/expenseTypes';
import { ICredentials, IParams } from '../types/historyTypes';


export const addExpense = async (credentials: ICredentials, expense: IExpenseFormData) => {
    try {
        let response = await fetch('/api/v1/expenses/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(expense)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const getExpensesByUser = async (
    params: any,
    credentials: ICredentials,
    signal: AbortSignal
) => {
    const query = queryString.stringify(params);

    try {
        let response = await fetch('/api/v1/expenses?' + query, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export const currentMonthPreview = async (credentials: ICredentials, signal: AbortSignal) => {
    try {
        let response = await fetch('/api/v1/expenses/current/preview', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        });

        return await response.json();
    } catch (err) {
        console.log(err);
    }
}

export const getExpensesByCategory = async (credentials: ICredentials, signal: AbortSignal) => {
    try {
        let response = await fetch('/api/v1/expenses/by/category', {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })

        return await response.json();

    } catch (err) {
        console.log(err)
    }
}

export const averageCategories = async (params, credentials: ICredentials, signal: AbortSignal) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch('/api/v1/expenses/category/averages?' + query, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const yearlyExpenses = async (
    params: any,
    credentials: ICredentials,
    signal: AbortSignal
) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch('/api/v1/expenses/yearly?' + query, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const plotExpenses = async (
    params: any,
    credentials: ICredentials,
    signal: AbortSignal
) => {
    const query = queryString.stringify(params)
    try {
        let response = await fetch('/api/v1/expenses/plot?' + query, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const getExpenseDetail = async (params: IParams, signal: AbortSignal) => {
    try {
        let response = await fetch('/api/v1/expense/' + params.expenseId, {
            method: 'GET',
            signal: signal,
        })
        return response.json()
    } catch (err) {
        console.log(err)
    }
}

export const updateExpense = async (
    params: IParams,
    credentials: ICredentials,
    expense: IExpense
) => {
    try {
        let response = await fetch('/api/v1/expenses/' + params.expenseId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(expense)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const removeExpense = async (params: IParams, credentials: ICredentials) => {
    try {
        let response = await fetch('/api/v1/expenses/' + params.expenseId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}