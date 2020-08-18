import CustomRequest from './CustomRequest';

const FabricsbySearch = async (SearchKey, Page, OrderBy, Token) => {
    return await CustomRequest(`Fabrics/FetchBySearch/?SearchKey=${encodeURI(SearchKey)}` + (Page ? `&Page=${Page}` : '') + (OrderBy ? `&OrderBy=${OrderBy}` : ''), 'GET', true, Token);
}

export default FabricsbySearch;
