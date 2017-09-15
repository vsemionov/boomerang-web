import axios from 'axios';
import decode from 'jwt-decode';


const JWT_KEY = 'jwt';


export const authState = {
    username: null
};


export function getAuthToken() {
    return localStorage.getItem(JWT_KEY);
}

function updateAuthStateFromToken(token) {
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
    updateAuthStateFromToken(token);
}

export function login(token) {
    localStorage.setItem(JWT_KEY, token);
    updateAuthStateFromToken(token);
}

export function logout() {
    localStorage.removeItem(JWT_KEY);
    updateAuthStateFromToken(null);
}

export function authenticate(username, password) {
    const options = {};
    if (username) {
        options.auth = { username: username, password: password };
    } else {
        options.withCredentials = true;
    }

    return axios.get('jwt/', options).then(response => login(response.data.token));
}
