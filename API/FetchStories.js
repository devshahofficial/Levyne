import {GET} from './CustomFetch';

const FetchStories = async (Token, abortControllerSignal) => {

    return await GET('Profile/FetchStories', {
        ReturnResponse: true,
        Token,
    }, abortControllerSignal)

}

export default FetchStories; 