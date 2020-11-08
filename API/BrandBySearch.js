import {GET} from './CustomFetch';

const BrandBySearch = async (SearchKey, Page, Token, abortControllerSignal) => {

    return await GET('Brand/SearchBrandProfile', {
        ReturnResponse: true,
        Token,
        QueryData: {
            SearchKey,
            Page
        }
    }, abortControllerSignal)
}

export default BrandBySearch;