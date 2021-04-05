import React, { ChangeEvent, useState } from 'react'
import { useLocation } from 'react-router';
import { loginUser } from '../../api/AuthAPI';
import LoginForm from '../../components/auth/LoginForm';
import auth from '../../helpers/auth-helper';
import { ILocation } from '../../types/historyTypes';
import { Redirect } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirectToReferrer: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = () => {
        const user = {
            email: values.email || undefined,
            password: values.password || undefined
        }
        setIsSubmitting(true);

        loginUser(user).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            }

            auth.authenticate(data, () => {
                setValues({ ...values, error: '', redirectToReferrer: true })
            });
            setIsSubmitting(false);
        });
    };

    const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value })
    }

    const { state } = useLocation<ILocation>();
    const { from } = state || {
        from: {
            pathname: '/'
        }
    };

    const { redirectToReferrer } = values;
    if (redirectToReferrer) {
        return <Redirect to={from} />;
    }

    return (
        <LoginForm
            isSubmitting={isSubmitting}
            handleChange={handleChange}
            onSubmit={onSubmit}
            values={values} />
    );
};

export default Login;
