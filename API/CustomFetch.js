import _ from 'lodash';

/**
 * 
 * @param {any} obj 
 * @param {?string} prefix
 * @returns {string}
 * 
 */

var encodeQueryData = function (obj, prefix) {
    let str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            let k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push(
                v !== null && typeof v === "object"
                    ? encodeQueryData(v, k)
                    : encodeURIComponent(k) + "=" + encodeURIComponent(v)
            );
        }
    }
    return str.join("&");
};

 /**
 * 
 * @param {String} URL 
 * @param {Object} config
 * @param {boolean} [config.ReturnResponse]
 * @param {boolean} [config.ThrowError]
 * @param {string} [config.Token]
 * @param {any} [config.Body]
 * @param {AbortSignal | undefined} abortControllerSignal
 */


export const POST = async (URL, { ReturnResponse, ThrowError, Token, Body }, abortControllerSignal = undefined) => {
    // @ts-ignore
    const resp = await fetch(global.BaseURL + URL, {
        method: 'POST',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Token) && { 'Authorization': Token }
        },
        ...(Body) && { body: JSON.stringify(Body) }
    });
    if (resp.status != 200) {
        if (ThrowError) {
            throw await resp.text();
        }
        throw resp.status;
    }
    else {
        if (ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}

/**
 * 
 * @param {String} URL 
 * @param {Object} config
 * @param {boolean} [config.ReturnResponse]
 * @param {boolean} [config.ThrowError]
 * @param {string} [config.Token]
 * @param {any} [config.QueryData]
 * @param {AbortSignal | undefined} abortControllerSignal
 */

export const GET = async (URL, { ReturnResponse = false, ThrowError = false, Token = "", QueryData = {} }, abortControllerSignal = undefined) => {

    // @ts-ignore
    const resp = await fetch(global.BaseURL + URL + '?' + encodeQueryData(QueryData, null), {
        method: 'GET',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Token) && { 'Authorization': Token }
        },
    });
    if (resp.status != 200) {
        if(ThrowError) {
            throw {
                Error: await resp.json(),
                Status: resp.status
            }
        }
        throw resp.status;
    }
    else {
        if (ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}
