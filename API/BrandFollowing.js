import { POST, GET } from './CustomFetch';

const FollowTheBrand = async (BrandID, Token, abortControllerSignal) => {

    await POST('Brand/FollowTheBrand', {
        Token,
        Body: {
            BrandID
        }
    }, abortControllerSignal);
    return;
}

const UnFollowTheBrand = async (BrandID, Token, abortControllerSignal) => {

    await POST('Brand/UnFollowTheBrand', {
        Token,
        Body: {
            BrandID
        }
    }, abortControllerSignal);
    return;
}

const FetchFollowedBrands = async (Page, Token, abortControllerSignal) => {

    return await GET('Brand/FetchFollowedBrands', {
        ReturnResponse: true,
        Token,
        QueryData: {
            Page
        }
    }, abortControllerSignal);
}

export default {
    FollowTheBrand,
    UnFollowTheBrand,
    FetchFollowedBrands
};