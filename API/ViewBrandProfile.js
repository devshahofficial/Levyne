import CustomRequest from './CustomRequest';
export default async (BrandID, Token) => {
    return await CustomRequest('Profile/ViewBrandProfile?BrandID=' + BrandID, 'GET', true, Token)
}