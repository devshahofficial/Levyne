import {GET} from '../CustomFetch';
import timeAgo from './timeAgo';


const GetLastMessage = (Message) => {
    switch(Message.Type) {
        case 1 :
            return Message.Text;
        case 2 :
            return '📷 Photo';
        case 3 :
            return 'Brand has decided the price';
        case 4 :
            return 'You added the product in the cart';
        case 5 :
            return 'You removed the product from the cart';
        case 6 :
            return 'Brand Removed the product from the cart';
        case 7:
            return 'You placed an order';
        case 8:
            return 'You cancelled an order';
        case 9:
            return 'Brand added the product to the Bucket';
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