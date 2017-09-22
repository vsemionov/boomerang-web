import axios from 'axios';

import { getAuthorization } from './auth.js';


const PAGE_SIZE = 24;


function request(url, method, data, cancelToken) {
    const config = {
        url: url,
        method: method,
        data: data
    };

    if (cancelToken) {
        config.cancelToken = cancelToken;
    }

    const auth = getAuthorization();
    if (auth) {
        config.headers = {
            Authorization: auth
        };
    }

    return axios.request(config)
        .then(response => response.data);
}

function getData(url, cancelToken) {
    return request(url, 'get', null, cancelToken);
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
    return getData(`info/`, cancelToken);
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

function writeObject(baseUrl, method, updated, data, cancelToken) {
    const url = `${baseUrl}?at=${updated}`;

    return request(url, method, data, cancelToken);
}

function patchObject(url, updated, data, cancelToken) {
    return writeObject(url, 'patch', updated, data, cancelToken);
}

function deleteObject(url, updated, cancelToken) {
    return writeObject(url, 'delete', updated, cancelToken);
}

export function renameNotebook(notebook, name, cancelToken) {
    const data = {
        name: name
    };

    return patchObject(`users/${notebook.user}/notebooks/${notebook.id}/`, notebook.updated, data, cancelToken);
}

export function deleteNotebook(notebook, cancelToken) {
    return deleteObject(`users/${notebook.user}/notebooks/${notebook.id}/`, notebook.updated, cancelToken);
}
