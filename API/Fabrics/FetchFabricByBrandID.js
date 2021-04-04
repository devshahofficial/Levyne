import {GET} from '../CustomFetch';

const FetchFabricByBrandID = async (BrandID, Page, abortControllerSignal) => {

    return await GET('Fabrics/FetchByBrandID', {
        ReturnResponse: true,
        QueryData: {BrandID, Page}
    }, abortControllerSignal)

}

export default FetchFabricByBrandID; 