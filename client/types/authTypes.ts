import { ChangeEvent } from 'react';

export interface AuthState extends SignupData {
    error: string
    redirectToReferrer?: boolean
    open?: boolean
}

export interface AuthFormProps {
    values: AuthState
    handleChange: (name: string) => (event: ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
    loading: boolean
}

export interface SignupData {
    name?: string
    email: string
    password: string
}

export interface SigninData {
    email: string
    password: string
}