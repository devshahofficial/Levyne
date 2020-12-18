import {GET} from './CustomFetch';

const FetchPosts = async (Page, abortControllerSignal) => {

    return await GET('Products/FetchDesignsByLevyne', {
        QueryData: {
            Page
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchPosts; 