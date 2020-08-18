import CustomRequest from './CustomRequest';
const BrandBySearch = async (SearchKey, Page, Token) => {
    return await CustomRequest(`Brand/SearchBrandProfile?SearchKey=${SearchKey}&Page=${Page}`, 'GET', true, Token);
}

export default BrandBySearch;