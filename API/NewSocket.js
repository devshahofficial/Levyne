import io from "socket.io-client";

export default async (Token) => {
    const socket = await io(global.URL + 'Customers', {
        auth: {
            authentication: Token,
            reconnectionDelay: 3000
        }
    });

    socket.on('connect', function () {
        console.log('connect');
    });

    socket.on('connect_error', function (data) {
        console.log(data);
        console.log(data || 'connect_failed');
    });

    socket.on('error', (err) => {
        console.log('Socket Error', err);
    });

    return socket;
}