import {GET} from '../CustomFetch';
import timeAgo from './timeAgo';


const GetLastMessage = (Message) => {
    switch(Message.Type) {
        case 1 :
            return Message.Text;
        case 2 :
            return '📷 Photo';
        case 3 :
            return 'You placed an order';
        case 4 :
            return 'You cancelled an order';
        case 5 :
            return 'Brand added customization charge';
        case 6 :
            return 'You Paid an customization charge';
        default : 
            return Message.Text || "";

        //More cases here
    }
}

const GetChatLists = async (Token, Page, abortController) => {

    if(Token) {
        let ChatList = await GET('Chat/FetchChatBuckets', {
            ReturnResponse: true,
            Token,
            QueryData: {
                Page
            }
        }, abortController);
    
        const unreadBuckets = []; 
        ChatList = ChatList.map(item => {
            if(item.unread) {
                unreadBuckets.push(item.BucketID);
            }
            item.Message = GetLastMessage(item),
            delete item.Type;
            delete item.Text;
            item.Timestamp = timeAgo(item.Timestamp);
            return item;
        });
        return [ChatList, unreadBuckets];
    } else {
        return [[], []];
    }
}

export default GetChatLists;