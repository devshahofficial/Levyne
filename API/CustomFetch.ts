import _ from 'lodash';


var encodeQueryData = function (obj: { [key: string]: any; }, prefix: string | null): string {
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


export const POST = async (URL: string, Config: { ReturnResponse?: boolean, ThrowError?: boolean, Token?:string, Body?: { [key: string]: any; } }, abortControllerSignal: AbortSignal | undefined = undefined) : Promise<any> => {
    const resp = await fetch(global.BaseURL + URL, {
        method: 'POST',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Config.Token) && { 'Authorization': Config.Token }
        },
        ...(Config.Body) && { body: JSON.stringify(Config.Body) }
    });
    if (resp.status != 200) {
        if (Config.ThrowError) {
            throw await resp.text();
        }
        throw resp.status;
    }
    else {
        if (Config.ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}

export const GET = async (URL: string, Config: { ReturnResponse?: boolean, ThrowError?: boolean, Token?:string, QueryData?: { [key: string]: any; } }, abortControllerSignal: AbortSignal | undefined = undefined) : Promise<any> => {

    // @ts-ignore
    const resp = await fetch(global.BaseURL + URL + '?' + encodeQueryData(Config.QueryData, null), {
        method: 'GET',
        signal: abortControllerSignal,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Config.Token) && { 'Authorization': Config.Token }
        },
    });
    if (resp.status != 200) {
        if(Config.ThrowError) {
            throw {
                Error: await resp.json(),
                Status: resp.status
            }
        }
        throw resp.status;
    }
    else {
        if (Config.ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}
