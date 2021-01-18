import {GET} from '../CustomFetch';

const FetchFabricByFilter = async (Filters, Page, Token, abortControllerSignal) => {

    return await GET('Fabrics/FetchByFilters', {
        ReturnResponse: true,
        Token,
        QueryData: {Filters, Page}
    }, abortControllerSignal)

}

export default FetchFabricByFilter; 