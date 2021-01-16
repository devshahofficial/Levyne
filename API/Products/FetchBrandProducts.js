import {GET} from '../CustomFetch';

const FetchBrandProducts = async (BrandID, Page, Token, abortControllerSignal) => {

    return await GET('Products/FetchBySearch', {
        ReturnResponse: true,
        Token,
        QueryData: {BrandID: [BrandID], Page}
    }, abortControllerSignal)

}

export default FetchBrandProducts; 