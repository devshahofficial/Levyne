import io from "socket.io-client/dist/socket.io";
import config from '../assets/constants';

export default async (Token) => {
    const socket = await io(config.URL + 'Customers', {
        transportOptions: {
            polling: {
                extraHeaders: {
                    'authentication': Token
                }
            }
        },
        forceNode: true
    });

    await socket.on('Error', (err) => {
        console.log(err);
    });

    return socket;
}