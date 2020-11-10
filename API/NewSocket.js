import io from "socket.io-client";
import config from '../assets/constants';

export default async (Token) => {
    const socket = await io(config.URL + 'Customers', {
        auth: {
            authentication: Token
        },
        localAddress: null,
    });

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('connect_error', function (data) {
        console.log(data || 'connect_failed');
    });

    socket.on('Error', (err) => {
        console.log('Socket Error', err);
    });

    return socket;
}