import io from "socket.io-client";

/**
 * @param {string} Token
 */
export default async (Token) => {
    // @ts-ignore
    const socket = await io(global.URL + 'Customers', {
        auth: {
            authentication: Token,
            reconnectionDelay: 3000
        }
    });

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('connect_error', /**
         * @param {any} data
         */
 function (data) {
        console.log(data || 'connect_failed');
    });

    
    socket.on('error', /**
    * @param {any} err
    */(err) => {
        console.log('Socket Error', err);
    });

    return socket;
}