import CustomRequest from './CustomRequest';
const AddWishlistFabricbyid = async (FabricID, Token) => {
    try {
        await CustomRequest(`Fabrics/AddToWishList`, 'POST', false, Token, {FabricID});
    } catch(err) {
        console.log(err);
    }
    return;
}
export default AddWishlistFabricbyid;