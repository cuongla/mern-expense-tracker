import { IParams, ICredentials } from '../types/historyTypes';
import { IUser } from '../types/userTypes';

export const getUsers = async (signal: AbortSignal) => {
    try {
        let response = await fetch('/api/v1/users/', {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const getUserDetail = async (
    params: IParams, 
    credentials: ICredentials, 
    signal: AbortSignal
) => {
    try {
        let response = await fetch('/api/v1/users/' + params.userId, {
            method: 'GET',
            signal: signal,
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

export const updateUser = async (
    params: IParams, 
    credentials: ICredentials, 
    user: IUser
) => {
    try {
        let response = await fetch('/api/v1/users/' + params.userId, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (
    params: IParams, 
    credentials: ICredentials
) => {
    try {
        let response = await fetch('/api/v1/users/' + params.userId, {
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
