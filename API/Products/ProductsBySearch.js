import {GET} from '../CustomFetch';

const ProductBySearch = async (Filters, Page, OrderBy, Token, abortControllerSignal) => {

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

export default ProductBySearch;
