import {GET} from './CustomFetch';

export default ListBookmarkProducts = async (Page, Token, abortControllerSignal) => {

    return await GET('Products/ListWishlistProducts', {
        ReturnResponse: true,
        Token,
        QueryData: {Page}
    }, abortControllerSignal)

}