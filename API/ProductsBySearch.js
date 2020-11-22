import {GET} from './CustomFetch';

const ProductbySearch = async (Filters, Page, OrderBy, Token, abortControllerSignal) => {

    return await GET('Products/FetchBySearch', {
        ReturnResponse: true,
        Token,
        QueryData: {
            ...Filters,
            Page,
            OrderBy
        }
    }, abortControllerSignal)

}

export default ProductbySearch;
