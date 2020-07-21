import CustomRequest from './CustomRequest';
const BrandBySearch = async (SearchKey, Page, Token) => {
    return await CustomRequest(`Profile/SearchBrandProfile?SearchKey=${SearchKey}&Page=${Page}`, 'GET', true, Token);
}

export default BrandBySearch;