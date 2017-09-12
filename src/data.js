import axios from 'axios';
import { getAuthToken } from './auth.js';


export function getNotebooks(username) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/notebooks/`, options).then(response => response.data.results);
}

export function getNotes(username, notebook_id) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/notebooks/${notebook_id}/notes/`, options).then(response => response.data.results);
}

export function getTasks(username) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(`users/${username}/tasks/`, options).then(response => response.data.results);
}
