import axios from 'axios';
import { getAuthToken } from './auth.js';


function getData(url) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(url, options).then(response => response.data);
}

function getList(url) {
    return getData(url).then(data => data.results);
}

export function getNotebooks(username) {
    return getList(`users/${username}/notebooks/?sort=-updated`);
}

export function getNotes(username, notebook_id) {
    return getList(`users/${username}/notebooks/${notebook_id}/notes/?sort=-updated`);
}

export function getTasks(username) {
    return getList(`users/${username}/tasks/?sort=done,-updated`);
}
