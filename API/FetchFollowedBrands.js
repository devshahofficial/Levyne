import CustomRequest from './CustomRequest';

const FetchFollowedBrands = async (Page, Token) => {
    return await CustomRequest(`Brand/FetchFollowedBrands?Page=${Page}`, 'GET', true, Token, undefined);
}

export default FetchFollowedBrands;