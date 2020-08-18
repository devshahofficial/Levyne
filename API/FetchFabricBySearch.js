import CustomRequest from './CustomRequest';
//diff query  in docs 
const FetchFabricBySearch = async (SearchKey, Page ,OrderBy, Token) => {
    return await CustomRequest(`Fabrics/FetchBySearch?SearchKey=${SearchKey}Page=${Page}OrderBy=${OrderBy}`, 'GET', true, Token);
}

export default FetchFabricBySearch;