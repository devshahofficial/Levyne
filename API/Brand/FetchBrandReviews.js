import { GET } from '../CustomFetch';

/**
 * @param {{ BrandID: any; Limit: number; }} QueryData
 * @param {AbortSignal | undefined} [abortControllerSignal]
 */
const FetchReview = async (QueryData, abortControllerSignal) => {
    return await GET('Brand/ViewBrandReviews', {
        ReturnResponse: true,
        QueryData
    }, abortControllerSignal)
}

export default FetchReview;