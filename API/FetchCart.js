import {GET} from './CustomFetch';

const FetchCart = async (Token, abortControllerSignal) => {

    return await GET('Cart/FetchCart', {
        ReturnResponse: true,
        Token
    }, abortControllerSignal)

}

export default FetchCart; 