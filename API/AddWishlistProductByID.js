import CustomRequest from './CustomRequest';
const AddWishlistProductByID = async (ProductID, Token, abortControllerSignal) => {
    await CustomRequest(`Products/AddToWishList`, 'POST', false, Token, {ProductID}, abortControllerSignal);
    return;
}


export default AddWishlistProductByID;