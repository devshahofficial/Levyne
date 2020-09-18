import CustomRequest from './CustomRequest';
const RemoveWishlistProductbyid = async (ProductID, Token, abortControllerSignal) => {
    await CustomRequest(`Products/RemoveFromWishList`, 'POST', false, Token, {ProductID}, abortControllerSignal);
    return;
}


export default RemoveWishlistProductbyid;