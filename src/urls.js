const BASE = process.env.NODE_ENV === 'production'? 'https://boomerang-core.herokuapp.com/' : 'http://127.0.0.1:8000/';
const API_BASE = BASE + 'api/';

export const JWT_URL = API_BASE + 'jwt/';
