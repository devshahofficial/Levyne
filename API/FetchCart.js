import CustomRequest from './CustomRequest';

const FetchCart = async (Token, abortControllerSignal) => {
    return await CustomRequest('Products/FetchCart', 'GET', true, Token, null, abortControllerSignal);
}

export default FetchCart;
