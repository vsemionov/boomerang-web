import decode from 'jwt-decode';

const JWT_KEY = 'jwt';

export const authState = {
    username: null
};


function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}

export function updateAuthState() {
    let username = null;

    const token = localStorage.getItem(JWT_KEY);
    if (token) {
        const payload = decode(token);
        if (payload.exp) {
            if (payload.exp * 1000 > Date.now()) {
                if (payload.username) {
                    username = payload.username;
                }
            }
        }
    }

    authState.username = username;
}
