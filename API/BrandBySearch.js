import CustomRequest from './CustomRequest';
const BrandBySearch = async (SearchKey, Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Brand/SearchBrandProfile?SearchKey=${SearchKey}&Page=${Page}`, 'GET', true, Token, null, abortControllerSignal);
}

export default BrandBySearch;