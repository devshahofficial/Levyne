import CustomRequest from './CustomRequest';
export default async (BrandID, Token, abortControllerSignal) => {
    return await CustomRequest('Brand/ViewBrandProfile?BrandID=' + BrandID, 'GET', true, Token, null, abortControllerSignal)
}