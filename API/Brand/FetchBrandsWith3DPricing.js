import {GET} from '../CustomFetch';

const FetchBrandsWith3DPricing = async (Source, SearchKey, Page, OrderBy, Token, abortControllerSignal) => {
    
    return await GET('Brand/FetchBrandsWith3DPricing', {
        ReturnResponse: true,
        Token,
        QueryData: {
            SearchKey,
            Page,
            OrderBy,
            Source
        }
    }, abortControllerSignal)
}

export default FetchBrandsWith3DPricing;