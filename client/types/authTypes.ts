import { ChangeEvent } from 'react';

export interface AuthState extends RegisterData {
    error: string
    redirectToReferrer?: boolean
    open?: boolean
}

export interface AuthFormProps {
    values: AuthState
    handleChange: (name: string) => (event: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    isSubmitting: boolean
}

export interface RegisterData {
    name?: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}