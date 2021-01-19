import {GET} from '../CustomFetch';

const FetchCategories = async (abortControllerSignal) => {

    return await GET('3DModelCategories', {
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchCategories; 