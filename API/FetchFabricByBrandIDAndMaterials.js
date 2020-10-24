import CustomRequest from './CustomRequest';
//diff query  in docs
const FetchFabricByBrandIDAndMaterials = async (BrandID, MaterialIDs, Page, Token, abortControllerSignal) => {
    let QueryForMaterialIDs = '';
    MaterialIDs.split(',').forEach(MaterialID => {
        QueryForMaterialIDs = QueryForMaterialIDs + 'MaterialIDs=' + MaterialID + '&';
    });
    return await CustomRequest(`Fabrics/FetchByBrandID?BrandID=${BrandID}&Page=${Page}&${QueryForMaterialIDs}`, 'GET', true, Token, null, abortControllerSignal);
}
export default FetchFabricByBrandIDAndMaterials;
