import {GET} from '../CustomFetch';

const FetchBucket = async (BucketID, Token, abortControllerSignal) => {

    return await GET('Cart/FetchPartialBucketByID', {
        ReturnResponse: true,
        Token,
        QueryData: {BucketID}
    }, abortControllerSignal)

}

export default FetchBucket; 