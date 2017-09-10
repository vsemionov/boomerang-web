import decode from 'jwt-decode';
import axios from 'axios';

import { API_URL } from './urls.js';
import handleError from './error.js';


const JWT_KEY = 'jwt';


export const authState = {
    username: null
};


function getAuthToken() {
    return localStorage.getItem(JWT_KEY);
}

function updateValidAuthState(token) {
    let username = null;

    if (token) {
        const payload = decode(token);
        if (payload.exp * 1000 > Date.now()) {
            username = payload.username;
        }
    }

    authState.username = username;
}

export function updateAuthState() {
    const token = getAuthToken();
    updateValidAuthState(token);
}

export function login(token) {
    localStorage.setItem(JWT_KEY, token);
    updateValidAuthState(token);
}

export function logout() {
    localStorage.removeItem(JWT_KEY);
    updateValidAuthState(null);
}

export function getValidAuthToken() {
    const token = getAuthToken();

    if (token) {
        const payload = decode(token);
        if (payload.exp * 1000 <= Date.now()) {
            logout();
            return null;
        }
    }

    return token;
}

export function authenticate(username, password) {
    const options = {};
    if (username) {
        options.headers = { Authorization: 'Basic ' + btoa(`${username}:${password}`) };
    } else {
        options.withCredentials = true;
    }

    return axios.get(API_URL + 'jwt/', options)
        .then(response => login(response.data.token))
        .catch(error => handleError(error));
}
