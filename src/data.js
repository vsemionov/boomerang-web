import axios from 'axios';

import { getAuthToken } from './auth.js';


const PAGE_SIZE = 24;


function request(url, method, data, cancelToken, auth=true) {
    const config = {
        url: url,
        method: method,
        data: data
    };

    if (cancelToken) {
        config.cancelToken = cancelToken;
    }

    if (auth) {
        const authToken = getAuthToken();
        if (authToken) {
            config.headers = {
                Authorization: `JWT ${authToken}`
            };
        }
    }

    return axios.request(config)
        .then(response => response.data);
}

function getData(url, cancelToken, auth=true) {
    return request(url, 'get', null, cancelToken, auth);
}

function getListResults(data) {
    return {
        numPages: Math.max(Math.ceil(data.count / PAGE_SIZE), 1),
        results: data.results
    };
}

function getList(baseUrl, page, cancelToken) {
    const url = `${baseUrl}&page=${page}&size=${PAGE_SIZE}`;

    return getData(url, cancelToken)
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

function modifyObject(baseUrl, method, updated, data, cancelToken, auth=true) {
    const url = `${baseUrl}&at=${updated}`;

    return request(url, method, data, cancelToken, auth);
}

function patchObject(url, updated, data, cancelToken, auth=true) {
    return modifyObject(url, 'patch', updated, data, cancelToken, auth);
}

export function renameNotebook(notebook, name, cancelToken) {
    const data = {
        name: name
    };

    return patchObject(`users/${notebook.user}/notebooks/${notebook.id}/`, notebook.updated, data, cancelToken);
}
