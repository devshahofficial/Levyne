import CustomRequest from './CustomRequest';
//diff query  in docs
const FetchFabricByBrandID = async (BrandID, Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Fabrics/FetchBySearch?BrandID=[${BrandID}]&Page=${Page}`, 'GET', true, Token, null, abortControllerSignal);
}
export default FetchFabricByBrandID;
