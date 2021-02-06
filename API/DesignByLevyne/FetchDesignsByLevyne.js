import {GET} from '../CustomFetch';

/**
 * @param {number} Page
 * @param {AbortSignal} abortControllerSignal
 */
const FetchDesignsByLevyne = async (Page, abortControllerSignal) => {

    return await GET('Products/FetchDesignsByLevyne', {
        QueryData: {
            Page
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchDesignsByLevyne; 