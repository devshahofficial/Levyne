import CustomRequest from './CustomRequest';
const RemoveWishlistProductbyid = async (ProductID, Token) => {
    await CustomRequest(`Products/RemoveFromWishList`, 'POST', false, Token, {ProductID});
    return;
}


export default RemoveWishlistProductbyid;