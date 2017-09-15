import axios from 'axios';

import { getAuthToken } from './auth.js';


const PAGE_SIZE = 24;


function getData(url, cancelToken, auth=true) {
    const options = {};

    if (cancelToken) {
        options.cancelToken = cancelToken;
    }

    if (auth) {
        const authToken = getAuthToken();
        if (authToken) {
            options.headers = {
                Authorization: `JWT ${authToken}`
            }
        }
    }

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

export function getInfo(cancelToken) {
    return getData(`info/`, cancelToken, false);
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
