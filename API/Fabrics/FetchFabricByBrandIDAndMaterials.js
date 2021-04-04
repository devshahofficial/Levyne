import {GET} from '../CustomFetch';

const FetchFabricByBrandIDAndMaterials = async (BrandID, MaterialIDs, Page, abortControllerSignal) => {

    return await GET('Fabrics/FetchByBrandID', {
        ReturnResponse: true,
        QueryData: {BrandID, Page, MaterialIDs}
    }, abortControllerSignal)

}

export default FetchFabricByBrandIDAndMaterials; 