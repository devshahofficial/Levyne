import CustomRequest from './CustomRequest';
const AddWishlistProductbyid = async (ProductID, Token) => {
    await CustomRequest(`Products/AddToWishList`, 'POST', false, Token, {ProductID});
    return;
}


export default AddWishlistProductbyid;