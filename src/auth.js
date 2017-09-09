import decode from 'jwt-decode';


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
