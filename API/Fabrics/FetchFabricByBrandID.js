import {GET} from '../CustomFetch';

const FetchFabricByBrandID = async (BrandID, Page, Token, abortControllerSignal) => {

    return await GET('Fabrics/FetchByBrandID', {
        ReturnResponse: true,
        Token,
        QueryData: {BrandID, Page}
    }, abortControllerSignal)

}

export default FetchFabricByBrandID; 