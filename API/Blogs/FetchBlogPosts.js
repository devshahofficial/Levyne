import {GET} from '../CustomFetch';

const FetchPosts = async (abortControllerSignal) => {

    return await GET('FetchBlogs', {
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchPosts; 