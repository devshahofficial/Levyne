import io from "socket.io-client";
import config from '../assets/constants';
export const Chat = {
    StartChat : (Token, BrandID) => {
        io(config.URL + 'Customers', {
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