import {GET} from '../CustomFetch';

const BrandBySearch = async (SearchKey, Page, OrderBy, Token, abortControllerSignal) => {
    
    return await GET('Brand/SearchBrandProfile', {
        ReturnResponse: true,
        Token,
        QueryData: {
            SearchKey,
            Page,
            OrderBy
        }
    }, abortControllerSignal)
}

export default BrandBySearch;