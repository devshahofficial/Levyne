import CustomRequest from './CustomRequest';

const FetchBuckets = async (Token, abortControllerSignal) => {
    return await CustomRequest('Products/FetchBuckets', 'GET', true, Token, null, abortControllerSignal);
}

export default FetchBuckets;
