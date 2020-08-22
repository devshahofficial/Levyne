import CustomRequest from './CustomRequest';
const AddWishlistFabricByID = async (FabricID, Token) => {
    try {
        await CustomRequest(`Fabrics/AddToWishList`, 'POST', false, Token, {FabricID});
    } catch(err) {
        console.log(err);
    }
    return;
}
export default AddWishlistFabricByID;