/**
 * 
 * @param {any} data 
 */

const encodeQueryData = (data) => {
    const ret = [];
    for (let d in data) {
        if (typeof data[d] === 'object' || typeof data[d] === 'array') {
            for (let arrD in data[d]) {
                ret.push(`${encodeURIComponent(d)}[]=${encodeURIComponent(data[d][arrD])}`)
            }
        } else if (typeof data[d] === 'null' || typeof data[d] === 'undefined') {
            ret.push(encodeURIComponent(d))
        } else {
            ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`)
        }

    }
    return ret.join('&');
}

/**
 * 
 * @param {String} URL 
 * @param {{ReturnResponse: boolean, ThrowError: boolean, Token: String, Body: any}} param1 
 */

export const POST = async (URL, {ReturnResponse, ThrowError, Token, Body}, abortControllerSignal) => {
    const resp = await fetch(global.BaseURL + URL, {
        method: 'POST',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Token) && {'Authorization': Token}
        },
        ...(Body) && {body: JSON.stringify(Body)}
    });
    if (resp.status != 200) {
        if(ThrowError) {
            throw await resp.text();
        }
        throw resp.status;
    }
    else {
        if(ReturnResponse) {
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

export const GET = async (URL, {ReturnResponse, Token, QueryData}, abortControllerSignal) => {

    const resp = await fetch(global.BaseURL + URL + '?' + encodeQueryData(QueryData), {
        method: 'GET',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Token) && {'Authorization': Token}
        },
    });
    if (resp.status != 200) {
        console.log(URL);
        console.log(await resp.text());
        throw resp.status;
    }
    else {
        if(ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}
