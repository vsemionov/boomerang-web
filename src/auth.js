import axios from 'axios';


const USERNAME_KEY = 'username';
const TOKEN_KEY = 'token';
const AUTH_TYPE = 'Token';


export const authState = {
    username: null
};


export function getAuthorization() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token ? `${AUTH_TYPE} ${token}` : null;
}

export function updateAuthState() {
    authState.username = localStorage.getItem(USERNAME_KEY);
}

export function login(username, token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USERNAME_KEY, username);

    authState.username = username;
}

export function logout() {
    authState.username = null;

    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
}

export function authenticate(username, password) {
    const options = {};
    if (username) {
        options.auth = { username: username, password: password };
    } else {
        options.withCredentials = true;
    }

    return axios.get('token/', options)
        .then(response => login(response.data.username, response.data.token));
}
