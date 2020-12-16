import {GET} from './CustomFetch';

const Recent15Brands = async (abortControllerSignal) => {

    return await GET('Brand/Recent15Brands', {
        ReturnResponse: true
    }, abortControllerSignal)

}

export default Recent15Brands; 