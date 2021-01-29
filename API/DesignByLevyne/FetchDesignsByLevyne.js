import {GET} from '../CustomFetch';

const FetchDesignsByLevyne = async (Page, abortControllerSignal) => {

    return await GET('Products/FetchDesignsByLevyne', {
        QueryData: {
            Page
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchDesignsByLevyne; 