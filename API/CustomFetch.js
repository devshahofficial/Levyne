import _ from 'lodash';

/**
 * 
 * @param {any} data 
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
 * @param {{ReturnResponse: boolean, ThrowError: boolean, Token: String, Body: any}} param1 
 */

export const POST = async (URL, { ReturnResponse, ThrowError, Token, Body }, abortControllerSignal) => {
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
 * @param {{ReturnResponse: boolean, Token: String, QueryData: any}} param1 
 */

export const GET = async (URL, { ReturnResponse, ThrowError, Token, QueryData }, abortControllerSignal) => {

    const resp = await fetch(global.BaseURL + URL + '?' + encodeQueryData(QueryData), {
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
