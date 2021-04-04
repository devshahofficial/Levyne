import {GET} from '../CustomFetch';

const FetchBrandProducts = async (BrandID, Page, abortControllerSignal) => {

    return await GET('Products/FetchBySearch', {
        ReturnResponse: true,
        QueryData: {BrandID: [BrandID], Page}
    }, abortControllerSignal)

}

export default FetchBrandProducts; 