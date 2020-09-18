import CustomRequest from './CustomRequest';

const FetchCart = async (BrandID, Token, abortControllerSignal) => {
    return await CustomRequest('Products/FetchCart?BrandID=' + BrandID, 'GET', true, Token, null, abortControllerSignal);
}

export default FetchCart;
