import {GET} from '../CustomFetch';

const FetchPost = async (PostID, abortControllerSignal) => {

    return await GET('FetchBlogByID', {
        ReturnResponse: true,
        QueryData: {
            PostID
        }
    }, abortControllerSignal)

}

export default FetchPost; 