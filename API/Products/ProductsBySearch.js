import {GET} from '../CustomFetch';

const ProductBySearch = async (Filters, Page, OrderBy, abortControllerSignal) => {

    return await GET('Products/FetchBySearch', {
        ReturnResponse: true,
        QueryData: {
            ...Filters,
            Page,
            OrderBy
        }
    }, abortControllerSignal)

}

export default ProductBySearch;
