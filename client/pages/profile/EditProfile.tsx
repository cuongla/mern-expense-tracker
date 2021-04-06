import React, { ChangeEvent, useEffect, useState } from 'react';
import auth from '../../helpers/auth-helper';
import EditProfileForms from '../../components/user/EditProfileForms'
import { getUserDetail, updateUser } from '../../api/UserAPI';
import { useParams } from 'react-router';
import { IParams } from '../../types/historyTypes';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/reusable/Loader';

const EditProfile = () => {
    const params = useParams<IParams>();
    const [values, setValues] = useState({
        userId: '',
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false
    });
    const [loading, setLoading] = useState(true);
    const [isUpdating, setIsUpdating] = useState(false);
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        getUserDetail({
            userId: params.userId
        }, { t: jwt.token }, signal).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            }
            setValues({ ...values, name: data.name, email: data.email });
            setLoading(false);
        });

        return function cleanup() {
            abortController.abort();
        };
    }, [params.userId]);

    const onSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        setIsUpdating(true);

        updateUser(
            { userId: params.userId },
            { t: jwt.token },
            user
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            }
            setValues({ ...values, userId: data._id, redirectToProfile: true })
            setIsUpdating(false);
        });
    };

    const handleChange = (name: string) => (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [name]: event.target.value })
    }

    if (values.redirectToProfile) {
        return <Redirect to={'/user/' + values.userId} />
    }
    return (
        <>
            { loading && <Loader />}
            <EditProfileForms
                isUpdating={isUpdating}
                onSubmit={onSubmit}
                handleChange={handleChange}
                values={values} />Mi
        </>

    )
}

export default EditProfile
