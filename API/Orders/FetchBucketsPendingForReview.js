import {GET} from '../CustomFetch';

const FetchBucketsPendingForReview = async (Token, abortControllerSignal) => {

    return await GET('Orders/FetchBucketsPendingForReview', {
        ReturnResponse: true,
        Token,
    }, abortControllerSignal)

}

export default FetchBucketsPendingForReview; 