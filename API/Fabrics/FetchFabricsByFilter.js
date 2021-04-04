import {GET} from '../CustomFetch';

const FetchFabricByFilter = async (Filters, Page, abortControllerSignal) => {

    return await GET('Fabrics/FetchByFilters', {
        ReturnResponse: true,
        QueryData: {Filters, Page}
    }, abortControllerSignal)

}

export default FetchFabricByFilter; 