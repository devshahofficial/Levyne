import io from "socket.io-client";
export const Chat = {
    StartChat : (Token, BrandID) => {
        io('https://api.levyne.com?UserType=Brand', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'authentication': Token
                    }
                }
            }
        }).on("ChatMessage", msg => {
            console.log(msg);  
        }).on('error', err => {
            console.log(err);
        });
    }
}