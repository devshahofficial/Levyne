import CustomRequest from './CustomRequest';

const FetchBucket = async (BucketID, Token, abortControllerSignal) => {
    return await CustomRequest('Products/FetchBucket?BucketID=' + BucketID, 'GET', true, Token, null, abortControllerSignal);
}

export default FetchBucket;
