import {GET} from '../CustomFetch';

/**
 * @param {string} SearchKey
 * @param {number} Page
 * @param {number} OrderBy
 * @param {string} Token
 * @param {AbortSignal | undefined} abortControllerSignal
 * @returns {Promise<{Brands: {ProfileImage: string, BrandID: number, About: string, Name: string, Rating: 0 | 1 | 2 | 3 | 4 | 5}[], Total: number, From: number}>}
 */
const BrandBySearch = async (SearchKey, Page, OrderBy, Token, abortControllerSignal) => {
    
    return await GET('Brand/SearchBrandProfile', {
        ReturnResponse: true,
        Token,
        QueryData: {
            SearchKey,
            Page,
            OrderBy
        }
    }, abortControllerSignal)
}

export default BrandBySearch;