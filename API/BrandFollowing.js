import CustomRequest from './CustomRequest';

const FollowTheBrand = async (BrandID, Token) => {
    await CustomRequest(`Brand/FollowTheBrand`, 'POST', false, Token, {BrandID})
    return;
}

const UnFollowTheBrand = async (BrandID, Token) => {
    await CustomRequest(`Brand/UnFollowTheBrand`, 'POST', false, Token, {BrandID})
    return;
}

const FetchFollowedBrands = async (Page, Token) => {
    return await CustomRequest(`Brand/FetchFollowedBrands?Page=` + Page, 'GET', true, Token)
}

export default {
    FollowTheBrand,
    UnFollowTheBrand,
    FetchFollowedBrands
};