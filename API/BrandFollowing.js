import CustomRequest from './CustomRequest';

const FollowTheBrand = async (BrandID, Token) => {
    await CustomRequest(`Profile/FollowTheBrand`, 'POST', false, Token, {BrandID})
    return;
}

const UnFollowTheBrand = async (BrandID, Token) => {
    await CustomRequest(`Profile/UnFollowTheBrand`, 'POST', false, Token, {BrandID})
    return;
}

export default {
    FollowTheBrand,
    UnFollowTheBrand
};