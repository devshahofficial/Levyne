import {GET} from './CustomFetch';

const FetchBucket = async (BucketID, Token, abortControllerSignal) => {

    return await GET('Products/FetchBucket', {
        ReturnResponse: true,
        Token,
        QueryData: {BucketID}
    }, abortControllerSignal)

}

export default FetchBucket; 