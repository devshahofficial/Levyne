import CustomRequest from './CustomRequest';
//diff query  in docs
const FetchFabricByBrandIDAndMaterials = async (BrandID, MaterialIDs, Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Fabrics/FetchBySearch?BrandID=[${BrandID}]&Page=${Page}&Materials=[${MaterialIDs}]`, 'GET', true, Token, null, abortControllerSignal);
}
export default FetchFabricByBrandIDAndMaterials;
