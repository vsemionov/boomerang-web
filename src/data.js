import axios from 'axios';
import { getAuthToken } from './auth.js';


const PAGE_SIZE = 24;


function getData(url, cancelToken) {
    const authToken = getAuthToken();

    const options = {
        headers: {
            Authorization: `JWT ${authToken}`,
        },
        cancelToken
    };

    return axios.get(url, options).then(response => response.data);
}

function getListResults(data) {
    return {
        numPages: Math.max(Math.ceil(data.count / PAGE_SIZE), 1),
        results: data.results
    };
}

function getList(url, page, cancelToken) {
    return getData(`${url}&page=${page}&size=${PAGE_SIZE}`, cancelToken)
        .then(data => getListResults(data));
}

export function getNotebooks(username, page, cancelToken) {
    return getList(`users/${username}/notebooks/?sort=-updated`, page, cancelToken);
}

export function getNotes(username, notebook_id, page, cancelToken) {
    return getList(`users/${username}/notebooks/${notebook_id}/notes/?sort=-updated`, page, cancelToken);
}

export function getTasks(username, page, cancelToken) {
    return getList(`users/${username}/tasks/?sort=done,-updated`, page, cancelToken);
}

export function getNotebook(username, notebook_id, cancelToken) {
    return getData(`users/${username}/notebooks/${notebook_id}/`, cancelToken);
}
