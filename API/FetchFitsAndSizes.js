import {GET} from './CustomFetch';

const FetchFitsAndSizes = async (Token, abortControllerSignal) => {

    return await GET('Profile/FetchFitsAndSizes', {
        ReturnResponse: true,
        Token,
    }, abortControllerSignal)

}

export default FetchFitsAndSizes; 