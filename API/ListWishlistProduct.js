//import config from '../assets/constants';
import CustomRequest from './CustomRequest';
export const ListWishlistProducts = async (Page, Token) => {
    return await CustomRequest(`Users/Products/ListWishlistProducts?Page=${Page}`, 'GET', true, Token);
}