import {GET} from '../CustomFetch';

const FetchCategories = async (CategoryID, abortControllerSignal) => {

    return await GET('3DModelsByCategoryID', {
        ReturnResponse: true,
        QueryData:{CategoryID}
    }, abortControllerSignal)

}

export default FetchCategories; 