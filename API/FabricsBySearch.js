import CustomRequest from './CustomRequest';

const FabricsBySearch = async (SearchKey, Page, OrderBy, Token, abortControllerSignal) => {
    return await CustomRequest(`Fabrics/FetchBySearch/?SearchKey=${encodeURI(SearchKey)}` + (Page ? `&Page=${Page}` : '') + (OrderBy ? `&OrderBy=${OrderBy}` : ''), 'GET', true, Token, null, abortControllerSignal);
}

export default FabricsBySearch;
