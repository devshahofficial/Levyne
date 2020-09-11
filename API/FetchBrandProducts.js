import CustomRequest from './CustomRequest';
const FetchBrandProducts = async (BrandID, Page, Token) => {
    return await CustomRequest(`Products/FetchBySearch?BrandID=${BrandID}&Page=${Page}`, 'GET', true, Token);
}


export default FetchBrandProducts;