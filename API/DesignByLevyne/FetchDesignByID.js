import {GET} from '../CustomFetch';

const FetchDesignByID = async (DesignID, abortControllerSignal) => {

    return await GET('Products/FetchDesignByLevyneByID', {
        QueryData: {
            DesignID
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchDesignByID; 