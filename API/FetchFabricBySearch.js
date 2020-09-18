import CustomRequest from './CustomRequest';
//diff query  in docs 
const FetchFabricBySearch = async (SearchKey, Page ,OrderBy, Token, abortControllerSignal) => {
    return await CustomRequest(`Fabrics/FetchBySearch?SearchKey=${SearchKey}Page=${Page}OrderBy=${OrderBy}`, 'GET', true, Token, abortControllerSignal);
}

export default FetchFabricBySearch;