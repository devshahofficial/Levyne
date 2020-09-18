import CustomRequest from './CustomRequest';

const FollowTheBrand = async (BrandID, Token, abortControllerSignal) => {
    await CustomRequest(`Brand/FollowTheBrand`, 'POST', false, Token, {BrandID}, abortControllerSignal)
    return;
}

const UnFollowTheBrand = async (BrandID, Token, abortControllerSignal) => {
    await CustomRequest(`Brand/UnFollowTheBrand`, 'POST', false, Token, {BrandID}, abortControllerSignal)
    return;
}

const FetchFollowedBrands = async (Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Brand/FetchFollowedBrands?Page=` + Page, 'GET', true, Token, null, abortControllerSignal)
}

export default {
    FollowTheBrand,
    UnFollowTheBrand,
    FetchFollowedBrands
};