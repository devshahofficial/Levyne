import {GET} from './CustomFetch';

const FetchPosts = async (Gender, abortControllerSignal) => {

    return await GET('Products/FetchDesignsByLevyne', {
        QueryData: {
            Gender
        },
        ReturnResponse: true,
    }, abortControllerSignal)

}

export default FetchPosts; 