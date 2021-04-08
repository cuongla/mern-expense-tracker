import { ChangeEvent } from "react";

export interface IExpense {
    _id?: string
    title: string
    category: string
    amount: string
    incurred_on: Date | number 
    notes: string
    updated?: Date | number 
    created?: Date | number
    recorded_by?: any
}

export interface IExpenseState extends IExpense{
    error?: string
}

export interface IExpenseFormData {
    title?: string
    category?: string
    amount?: number | string
    incurred_on?: Date
    notes?: string
    redirect?: boolean
}

export interface ExpenseFormProps {
    values: IExpenseState
    handleChange: (name: string) => (event: ChangeEvent<HTMLInputElement>) => void
    handleDateChange: (date: Date | number) => void
    isSubmitting?: boolean
    isUpdating?: boolean 
    onSubmit: () => void
}