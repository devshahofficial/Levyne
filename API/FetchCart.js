import {GET} from './CustomFetch';

const FetchCart = async (Token, abortControllerSignal) => {

    return await GET('Cart/FetchListOfBuckets', {
        ReturnResponse: true,
        Token
    }, abortControllerSignal)

}

export default FetchCart; 