import axios from 'axios';
import { getAuthToken } from './auth.js';


export function getNotebooks(username) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/notebooks/?sort=-updated`, options).then(response => response.data.results);
}

export function getNotes(username, notebook_id) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/notebooks/${notebook_id}/notes/?sort=-updated`, options).then(response => response.data.results);
}

export function getTasks(username) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/tasks/?sort=done,-updated`, options).then(response => response.data.results);
}
