import {GET} from './CustomFetch';

const FetchStories = async (Token, abortControllerSignal) => {

    if(Token) {
        return await GET('Profile/FetchStories', {
            ReturnResponse: true,
            Token,
        }, abortControllerSignal)
    } else {
        return [];
    }
}

export default FetchStories; 