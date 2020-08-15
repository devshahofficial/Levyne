import config from '../assets/constants';

/**
 * 
 * @param {string} URL 
 * @param {'GET' | 'POST'} Method 
 * @param {string} Token 
 * @param {Object} Body 
 * @param {boolean} ReturnResponse 
 */


const CustomRequest = async (URL, Method, ReturnResponse, Token, Body) => {
    const resp = await fetch(config.BaseURL + URL, {
        method: Method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...(Token) && {'Authorization': Token}
        },
        ...(Body) && {body: JSON.stringify(Body)}
    });
    if (resp.status != 200) {
        throw new Error('Response status :  ' + resp.status);
    }
    else {
        if(ReturnResponse) {
            return await resp.json();
        }
        return;
    }
}

export default CustomRequest;