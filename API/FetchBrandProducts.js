import CustomRequest from './CustomRequest';
const FetchBrandProducts = async (BrandID, Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Products/FetchBySearch?BrandID[]=${BrandID}&Page=${Page}`, 'GET', true, Token, null, abortControllerSignal);
}


export default FetchBrandProducts;