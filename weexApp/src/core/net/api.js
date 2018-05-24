import {TOKEN_KEY, USER_BASIC_CODE, DEBUG} from '../../config/Config'
import {getCache, removeCache, setCache} from '../common/storageUtils'

export const CONTENT_TYPE_JSON = "application/json";
export const CONTENT_TYPE_FORM = "application/x-www-form-urlencoded";

class HttpManager {

    constructor() {
        this.optionParams = {
            timeoutMs: 15000,
            token: null,
        };
    };


    async getFetch(url, type) {
        return this.netFetch(url, 'GET', null, null, type)
    }

    async netFetch(url, method = 'GET', params, json, type) {
        debugger
        //请求头
        let headers = {};
        let token = await getCache(TOKEN_KEY);
        if(token) {
            this.optionParams.token = token;
            headers.Authorization = this.optionParams.token;
        }
        debugger
        //请求参数
        let requestParams;
        if (method !== 'GET') {
            if (json) {
                requestParams = this.formParamsJson(method, params, headers)
            } else {
                requestParams = this.formParams(method, params, headers)
            }
        } else {
            requestParams = this.formParams(method, params, headers)
        }

        let response = await this.requestWithTimeout(this.optionParams.timeoutMs, this.fetch(url, requestParams, type));
        return response.data;
    }

    //清除缓存信息
    clearAuthorization() {
        this.optionParams.token = null;
        removeCache(TOKEN_KEY);
    }
    //获取token
    async getAuthorization() {
        let token = await getCache(TOKEN_KEY);
        if(token) {
            this.optionParams.token = token;
            return token;
        }
    }

    //处理请求头 body
    formParamsJson(method, params, headers) {
        const body = JSON.stringify(params);
        const req = {
            method: method,
            headers: {
                'Content-Type': CONTENT_TYPE_JSON,
                ...(headers || {})
            },
            body
        };
        return req
    }

    //处理请求头 body
    formParams(method, params, headers) {
        const str = [];
        for (let p in params) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
        let body = null;
        if (str.length > 0) {
            body = str.join("&");
        }
        const req = {
            method: method,
            headers: {
                'Content-Type': CONTENT_TYPE_FORM,
                ...(headers || {})
            }
            ,
            body
        };
        return req
    }

    requestWithTimeout(ms, promise) {
        return new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                resolve({
                    status: NETWORK_TIMEOUT,
                    message: ""
                })
            }, ms);
            promise.then(
                (res) => {
                    clearTimeout(timeoutId);
                    resolve(res);
                },
                (err) => {
                    clearTimeout(timeoutId);
                    resolve(err);
                }
            );
        })
    }

    fetch(path, requestParams, type = 'json') {
        const stream = weex.requireModule('stream');
        return new Promise((resolve, reject) => {
            stream.fetch({
                method: requestParams.method,
                url: path,
                headers: requestParams.headers,
                type: type,
                body: requestParams.method === 'GET' ? "" : requestParams.body
            }, (response) => {
                resolve(response)
            }, () => {
            })
        })

    }
}

export default new HttpManager();
