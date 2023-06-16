import Axios, { AxiosError, AxiosRequestHeaders, AxiosResponse, Method } from 'axios';
import Config from 'react-native-config';
import { call, put, select } from 'redux-saga/effects';

export const API_URL = 'https://random-data-api.com/api/';

export const enum AuthorizationMode {
    PUBLIC = 0,
    ACCESS_TOKEN = 1,
}

const ACCESS_TOKEN = 'ACCESS_TOKEN'

const enum ResponseCode {
    SUCCESS = 201,
    UNAUTHORIZED = 401,
    TOKEN_REMOVED = 403,
    NOT_FOUND = 404,
    INTERVAL_SERVER = 500,
    ERR_BAD_REQUEST = 400,
}

export const removeUndefinedField = (params: object) => {
    Object.keys(params).forEach(key => {
        if (typeof params[key] === 'undefined') {
            delete params[key];
        }
    });
    return params;
};

export const convertPayloadToQueryString = (payload: object = {}) => {
    return Object.keys(payload)
        .map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]);
        })
        .join('&');
};

export const removeField = (params: object, deleteField: string) => {
    Object.keys(params).forEach(key => {
        if (key === deleteField) {
            delete params[key];
        }
    });
    return params;
};


const instance = Axios.create({
    baseURL: API_URL,
    timeout: 60000,
});


instance.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error),
);

const errorHandler = async (error: AxiosError) => {
    const statusCode = error?.response?.status;

    if (statusCode === ResponseCode.TOKEN_REMOVED) {
        return Promise.reject({ ...error });
    }

    if (statusCode === 500 || statusCode === 502) {
        console.log('internalServerError');
        return;
    }

    return Promise.reject({ ...error });
};

const successHandler = async (response: AxiosResponse) => {
    if (__DEV__) {
        console.log(`Response API: ${response.config.url}`, response.data);
    }

    return response.data;
};

export function getHeader(
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
    headerType = 'application/json',
) {
    const header = customHeaders || {};
    if (authorizationMode === AuthorizationMode.ACCESS_TOKEN) {
        header['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }
    return {
        ...header,
        'Content-Type': headerType,
    } as AxiosRequestHeaders;
}

export async function apiRequestGet<ReqType, ResType>(
    url: string,
    params?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
): Promise<ResType> {
    const headers = getHeader(authorizationMode, customHeaders);
    return instance.get(url, { params, headers });
}

export async function apiRequestPost<ReqType, ResType>(
    url: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
): Promise<ResType> {
    const headers = getHeader(authorizationMode, customHeaders);
    return instance.post(url, { ...data }, { headers });
}

export async function apiRequestDelete<ReqType, ResType>(
    url: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
): Promise<ResType> {
    const headers = getHeader(authorizationMode, customHeaders);
    return instance.delete(url, { data: { ...data }, headers: { ...headers } });
}

async function apiRequest<ReqType, ResType>(
    method?: Method,
    url?: string,
    data?: ReqType,
    authorizationMode?: AuthorizationMode,
    customHeaders?: Record<string, unknown>,
): Promise<ResType> {
    const headers = getHeader(authorizationMode, customHeaders);
    return instance.request({
        method,
        url,
        headers,
        data,
    });
}

export default apiRequest;

function logRequest(method, url, params) {
    if (__DEV__) {
        // console?.tron?.log(`${method}: ${url}`, params);
        console.log(`${method}: ${url}`, params);
    }
}

function logResponse(response, data) {
    if (__DEV__) {
        console.log(
            `%cRESPONSE:%c${' ' + response.url + ' '} %c${response.status}`,
            `color: #fff; background: ${'#1C5629'}`,
            `color: #fff; background: ${'transparent'}`,
            `color: #fff; background: ${response.status === 200 ? '#1C5629' : '#AB1010'}`,
            data,
        );
    }
}

function dataResponse(content, response) {
    let data;
    try {
        data = content ? JSON.parse(content) : {};
        logResponse(response, data);
    } catch (error) {
        logResponse(response, error);
        throw error;
    }
    return data;
}

function handleErrorRes(data) {
    const message = data?.message || data?.info?.message;
    if (message) {
        return {
            ...data,
            message,
        };
    }

    return data;
}

function* checkResponseCode(response) {
    if (response.ok) {
        return;
    }

    if (response.status === 500 || response.status === 502) {
        console.log('internalServerError');
        return;
    }

    if (response.status === 401) {
        // check if login
        const isLogin = true
        if (isLogin) {
            // logout
            setTimeout(() => {
                console.log('sessionTerminated');
                // go To Login
            }, 500);
        }

        return;
    }

    const content = yield response.text();
    throw handleErrorRes(dataResponse(content, response));
}

function* processResponse(response) {
    yield call(checkResponseCode, response);
    const content = yield response.text();
    return dataResponse(content, response);
}

function getFullUrl(url) {
    if (url.includes('https')) {
        return url;
    }
    return `${API_URL}${url}`;
}

export function getRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {...removeUndefinedField(params)};

        const requestConfig = {
            method: 'GET',
            headers: yield getHeader(authorizationMode),
        };

        const query = convertPayloadToQueryString(data);
        const fullUrl = query ? `${getFullUrl(url)}?${query}` : getFullUrl(url);
        const response = yield call(fetch, fullUrl, requestConfig);

        logRequest('GET', url, data);
        return yield processResponse(response);
    };
}

export function postRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'POST',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('POST', url, data);
        return yield processResponse(response);
    };
}

export function deleteRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'DELETE',
            headers: yield getHeader(authorizationMode),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('DELETE', url, data);
        return yield processResponse(response);
    };
}

export function putRequest(url, authorizationMode: AuthorizationMode, params = {}) {
    return function* rest() {
        const data: object = {
            ...removeUndefinedField(params),
        };

        const requestConfig = {
            method: 'PUT',
            headers: yield getHeader(authorizationMode),
            body: JSON.stringify(data),
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('PUT', url, data);
        return yield processResponse(response);
    };
}

export function postFormData(url, authorizationMode: AuthorizationMode, params) {
    return function* rest() {
        const data = { ...params };
        const requestConfig = {
            method: 'POST',
            headers: yield getHeader(authorizationMode, null, 'multipart/form-data'),
            body: data,
        };
        const response = yield call(fetch, getFullUrl(url), requestConfig);

        logRequest('POST_FORM', url, requestConfig);
        return yield processResponse(response);
    };
}
