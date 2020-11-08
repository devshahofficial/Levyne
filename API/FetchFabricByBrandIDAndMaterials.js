import {GET} from './CustomFetch';

const FetchFabricByBrandIDAndMaterials = async (BrandID, MaterialIDs, Page, Token, abortControllerSignal) => {

    return await GET('Fabrics/FetchByBrandID', {
        ReturnResponse: true,
        Token,
        QueryData: {BrandID, Page, MaterialIDs: MaterialIDs.split(',')}
    }, abortControllerSignal)

}

export default FetchFabricByBrandIDAndMaterials; 