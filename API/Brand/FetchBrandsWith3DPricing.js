import {GET} from '../CustomFetch';

const FetchBrandsWith3DPricing = async (QueryData, abortControllerSignal) => {

    return await GET('Brand/FetchBrandsWith3DPricing', {
        ReturnResponse: true,
        QueryData
    }, abortControllerSignal)
}

export default FetchBrandsWith3DPricing;