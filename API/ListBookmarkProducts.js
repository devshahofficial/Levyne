import {GET} from './CustomFetch';

export default ListBookmarkProducts = async (Page, Token, abortControllerSignal, RefreshContent) => {

    const QueryData = {Page}
    if(RefreshContent) {
        QueryData.RefreshToken = Math.random.toString()
    }
    return await GET('Products/ListWishlistProducts', {
        ReturnResponse: true,
        Token,
        QueryData
    }, abortControllerSignal)

}