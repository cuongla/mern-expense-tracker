import React, { ChangeEvent, useState } from 'react'
import { addExpense } from '../../api/ExpenseAPI';
import auth from '../../helpers/auth-helper';
import { Redirect } from 'react-router-dom';
import AddExpenseForm from '../../components/expense/AddExpenseForm';

const EditExpese = () => {
    const [values, setValues] = useState({
        title: '',
        category: '',
        amount: '',
        incurred_on: new Date(),
        notes: '',
        error: '',
        redirect: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const jwt = auth.isAuthenticated()

    const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const handleDateChange = (date: Date) => {
        setValues({ ...values, incurred_on: date })
    }

    const onSubmit = () => {
        const expense = {
            title: values.title || undefined,
            category: values.category || undefined,
            amount: values.amount || undefined,
            incurred_on: values.incurred_on || undefined,
            notes: values.notes || undefined
        };
        setIsSubmitting(true);

        addExpense(
            { t: jwt.token },
            expense
        ).then((data) => {
            if (data.error) {
                setValues({ 
                    ...values, 
                    error: data.error 
                })
            } else {
                setValues({ 
                    ...values, 
                    error: '', 
                    redirect: true 
                });
            };
        });
    };

    if (values.redirect) {
        return <Redirect to={'/'} />
    }

    return (
        <AddExpenseForm 
            onSubmit={onSubmit}
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            values={values}
            isSubmitting={isSubmitting} />
    )
}

export default EditExpese
