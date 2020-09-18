//import config from '../assets/constants';
import CustomRequest from './CustomRequest';
export const ListWishlistProducts = async (Page, Token, abortControllerSignal) => {
    return await CustomRequest(`Users/Products/ListWishlistProducts?Page=${Page}`, 'GET', true, Token, null, abortControllerSignal);
}