import { io, Socket } from "socket.io-client";

/**
 * @param {string} Token
 */
export default async (Token: string) : Promise<Socket> => {
    const socket = io(global.MainURL + 'Customers', {
        auth: {
            authentication: Token,
            reconnectionDelay: 3000
        }
    });

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('connect_error', function (data: any) {
        console.log(data || 'connect_failed');
    });

    
    socket.on('error', (err: any) => {
        console.log('Socket Error', err);
    });

    return socket;
}