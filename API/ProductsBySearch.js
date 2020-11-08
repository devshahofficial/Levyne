import {GET} from './CustomFetch';

const ProductbySearch = async (SearchKey, Page, OrderBy, Token, abortControllerSignal) => {

    return await GET('Products/FetchBySearch', {
        ReturnResponse: true,
        Token,
        QueryData: {
            SearchKey,
            Page,
            OrderBy
        }
    }, abortControllerSignal)

}

export default ProductbySearch;
