import {GET} from '../CustomFetch';

export default ListWishlistProductIDs = async (Token, abortControllerSignal) => {

    return await GET('Products/ListWishlistProductIDs', { ReturnResponse: true, Token }, abortControllerSignal);

}