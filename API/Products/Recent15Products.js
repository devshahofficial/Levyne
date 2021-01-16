import {GET} from '../CustomFetch';

const Recent15Products = async (Token, abortControllerSignal) => {

    return await GET('Products/Recent15Products', {
        ReturnResponse: true,
        Token
    }, abortControllerSignal)

}

export default Recent15Products; 