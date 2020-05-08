import * as actionTypes from './actionTypes'
import axios from 'axios'

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const authLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('localId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        } , expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYf2tHajT0dCeTsozaBPEpq701nOT9w4s'

        if (!isSignUp) {
            url =  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCYf2tHajT0dCeTsozaBPEpq701nOT9w4s'
        }

        axios.post(url, { email: email, password: password, returnSecureToken: true })
            .then(response => {
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000))
                localStorage.setItem('localId', response.data.localId)
                dispatch(authSuccess(response.data));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch( error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) return;
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) dispatch(authLogout())
            else {
                const localId = localStorage.getItem('localId')
                dispatch(authSuccess({idToken: token, localId: localId}))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
            
        }
    }
}