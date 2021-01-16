import {GET} from './CustomFetch';

export default ListBookmarkProducts = async (Page, Token, abortControllerSignal, RefreshContent) => {

    const QueryData = {Page}
    if(RefreshContent) {
        QueryData.Random = Math.random()
    }
    return await GET('Products/ListWishlistProducts', {
        ReturnResponse: true,
        Token,
        QueryData
    }, abortControllerSignal)

}