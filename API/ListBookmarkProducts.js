//import config from '../assets/constants';
import CustomRequest from './CustomRequest';
export default ListBookmarkProducts = async (Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Products/ListWishlistProducts?Page=${Page}`, 'GET', true, Token, null, abortControllerSignal)
}