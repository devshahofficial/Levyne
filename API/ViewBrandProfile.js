import { GET } from './CustomFetch';

export default async (BrandID, Token, abortControllerSignal) => {
    return await GET('Profile/ViewBrandProfile', {
        ReturnResponse: true,
        QueryData: {BrandID},
        Token
    }, abortControllerSignal)
}