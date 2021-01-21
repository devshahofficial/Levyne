import {GET} from '../CustomFetch';

const FetchCart = async (Token, abortControllerSignal) => {

    return await GET('CartV2/FetchListOfBuckets', {
        ReturnResponse: true,
        Token
    }, abortControllerSignal)

}

export default FetchCart; 