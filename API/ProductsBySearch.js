import CustomRequest from './CustomRequest';

const ProductBySearch = async (SearchKey, Page, OrderBy, Token, abortControllerSignal) => {
    return await CustomRequest(`Products/FetchBySearch/?SearchKey=${encodeURI(SearchKey)}` + (Page ? `&Page=${Page}` : '') + (OrderBy ? `&OrderBy=${OrderBy}` : ''), 'GET', true, Token, null, abortControllerSignal);
}

export default ProductBySearch;