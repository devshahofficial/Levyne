//import config from '../assets/constants';

// different url in doc
import CustomRequest from './CustomRequest';
export const ListWishlistFabric = async (Page, Token) => {
    return await CustomRequest(`Users/Fabrics/ListWishlistFabrics?Page=${Page}`, 'GET', true, Token);
}