import CustomRequest from './CustomRequest';

const ProductbySearch = async (SearchKey, Page, OrderBy, Token) => {
    return await CustomRequest(`Products/FetchBySearch/?SearchKey=${encodeURI(SearchKey)}` + (Page ? `&Page=${Page}` : '') + (OrderBy ? `&OrderBy=${OrderBy}` : ''), 'GET', true, Token);
}

export default ProductbySearch;