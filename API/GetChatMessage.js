import {POST} from './CustomFetch';
import timeAgo from './timeAgo';

const GetChatMessages = async (BucketID, Page, Token) => {

    let ChatMessages = await POST('Chat/FetchBucketMessages', {
        ReturnResponse: true,
        Token,
        Body: {
            Page,
            BucketID
        }
    })
    
    ChatMessages.Messages = ChatMessages.Messages.map(item => {
        item.Message = JSON.parse(item.Message);
        item.Timestamp = timeAgo(item.Timestamp);
        return item;
    });
    
    return ChatMessages
}

export default GetChatMessages;