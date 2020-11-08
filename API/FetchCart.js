import {GET} from './CustomFetch';

const FetchCart = async (Token, abortControllerSignal) => {

    return await GET('Products/FetchCart', {
        ReturnResponse: true,
        Token
    }, abortControllerSignal)

}

export default FetchCart; 