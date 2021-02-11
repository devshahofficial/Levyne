import { GET } from '../CustomFetch';

/**
 * @param {string} SearchKey
 * @param {number} Page
 * @param {number} OrderBy
 * @param {0|1} Gender
 * @param {string} Token
 * @param {AbortSignal | undefined} abortControllerSignal
 * @returns {Promise<{Brands: {ProfileImage: string, BrandID: number, About: string, Name: string, Rating: 0 | 1 | 2 | 3 | 4 | 5}[], Total: number, From: number}>}
 */
const BrandBySearch = async (SearchKey, Page, OrderBy, Gender, Token, abortControllerSignal) => {

    const QueryData = {
        SearchKey,
        Page,
        OrderBy
    };
    if(typeof Gender === 'number') {
        // @ts-ignore
        QueryData.Gender = Gender;
    }

    return await GET('Brand/SearchBrandProfile', {
        ReturnResponse: true,
        Token,
        QueryData
    }, abortControllerSignal)
}

export default BrandBySearch;