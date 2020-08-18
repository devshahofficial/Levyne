import CustomRequest from './CustomRequest';
export default async (BrandID, Token) => {
    return await CustomRequest('Brand/ViewBrandProfile?BrandID=' + BrandID, 'GET', true, Token)
}