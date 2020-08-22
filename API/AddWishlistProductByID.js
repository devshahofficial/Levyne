import CustomRequest from './CustomRequest';
const AddWishlistProductByID = async (ProductID, Token) => {
    await CustomRequest(`Products/AddToWishList`, 'POST', false, Token, {ProductID});
    return;
}


export default AddWishlistProductByID;