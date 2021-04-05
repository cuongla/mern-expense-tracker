import { SigninData, SignupData } from '../types/authTypes';

export const registerUser = async (user: SignupData) => {
    try {
        let response = await fetch(
            '/api/v1/auth/signup/',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
        return await response.json();
    } catch (err: any) {
        console.log(err);
    };
};

export const loginUser = async (user: SigninData) => {
    try {
        let response = await fetch(
            '/api/v1/auth/signin',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            });
        return await response.json()
    } catch (err: any) {
        console.log(err)
    };
};

export const logoutUser = async () => {
    try {
        let response = await fetch(
            '/api/v1/auth/signout',
            { method: 'GET' }
        );
        return await response.json();
    } catch (err: any) {
        console.log(err)
    };
};