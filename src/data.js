import axios from 'axios';
import { getAuthToken } from './auth.js';


const PAGE_SIZE = 24;


function getData(url) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`
        }
    };

    return axios.get(url, options).then(response => response.data);
}

function getListResults(data) {
    return {
        numPages: Math.max(Math.ceil(data.count / PAGE_SIZE), 1),
        results: data.results
    };
}

function getList(url, page) {
    return getData(`${url}&page=${page}&size=${PAGE_SIZE}`).then(data => getListResults(data));
}

export function getNotebooks(username, page) {
    return getList(`users/${username}/notebooks/?sort=-updated`, page);
}

export function getNotes(username, notebook_id, page) {
    return getList(`users/${username}/notebooks/${notebook_id}/notes/?sort=-updated`, page);
}

export function getTasks(username, page) {
    return getList(`users/${username}/tasks/?sort=done,-updated`, page);
}
