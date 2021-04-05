import React, { ChangeEvent, useState } from 'react'
import { registerUser } from '../../api/AuthAPI';
import RegisterForm from '../../components/auth/RegisterForm';
import { RegisterData } from '../../types/authTypes';

const Login = () => {
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
        const user: RegisterData = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        };
        setIsSubmitting(true);

        registerUser(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }
            setValues({ ...values, error: '', open: true })
            setIsSubmitting(false);
        })
    }

    return (
        <RegisterForm
            values={values}
            onSubmit={onSubmit}
            handleChange={handleChange}
            isSubmitting={isSubmitting} />
    );
};

export default Login;
