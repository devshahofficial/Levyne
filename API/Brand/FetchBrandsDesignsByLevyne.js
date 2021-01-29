import {GET} from '../CustomFetch';

const FetchDesignByLevynePricing = async (DesignID, abortControllerSignal) => {

    return await GET('Products/FetchDesignByLevynePricing', {
        ReturnResponse: true,
        QueryData: {
            DesignID
        }
    }, abortControllerSignal)
}

export default FetchDesignByLevynePricing;