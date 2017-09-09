import decode from 'jwt-decode';


const JWT_KEY = 'jwt';


export const authState = {
    username: null
};


function getAuthToken() {
    return localStorage.getItem(JWT_KEY);
}

export function updateAuthState() {
    const token = getAuthToken();

    let username = null;

    if (token) {
        const payload = decode(token);
        if (payload.exp * 1000 > Date.now()) {
            username = payload.username;
        }
    }

    authState.username = username;
}

export function login(token) {
    localStorage.setItem(JWT_KEY, token);
    updateAuthState();
}

export function logout() {
    localStorage.removeItem(JWT_KEY);
    updateAuthState();
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
