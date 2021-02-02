import { GET } from '../CustomFetch';

const FetchReview = (QueryData, abortControllerSignal) => {
    return new GET('Brand/ViewBrandReviews', {
        ReturnResponse: true,
        QueryData
    }, abortControllerSignal)
}

export default FetchReview;