import {POST} from '../CustomFetch';

const CreateChatBucket = async (BrandID, Token, abortControllerSignal) => {

    return await POST('Chat/CreateChatBucket', {
        ReturnResponse: true,
        Token,
        Body: {
            BrandID
        },
        ThrowError: true
    }, abortControllerSignal)
    
}

export default CreateChatBucket;