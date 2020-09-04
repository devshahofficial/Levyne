import CustomRequest from './CustomRequest';

const FetchCart = async (BrandID, Token) => {
    return await CustomRequest('Products/FetchCart?BrandID=' + BrandID, 'GET', true, Token);
}

export default FetchCart;
