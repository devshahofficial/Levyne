import CustomRequest from './CustomRequest';

const FetchBuckets = async (Token) => {
    return await CustomRequest('Products/FetchBuckets', 'GET', true, Token);
}

export default FetchBuckets;
