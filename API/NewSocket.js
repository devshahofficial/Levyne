import io from "socket.io-client/dist/socket.io";

export default async (Token) => {
    var socket = await io('https://api.levyne.com/?UserType=Brand', {
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