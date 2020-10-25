import CustomRequest from './CustomRequest';

const FetchFollowedBrands = async (Page, BrandID, Token) => {
    return await CustomRequest(`Brand/FetchBrandFollowings?Page=${Page}&BrandID=${BrandID}`, 'GET', true, Token, undefined);
}

export default FetchFollowedBrands;