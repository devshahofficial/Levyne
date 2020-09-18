import CustomRequest from './CustomRequest';
const AddWishlistFabricByID = async (FabricID, Token, abortControllerSignal) => {
    try {
        await CustomRequest(`Fabrics/AddToWishList`, 'POST', false, Token, {FabricID}, abortControllerSignal);
    } catch(err) {
        console.log(err);
    }
    return;
}
export default AddWishlistFabricByID;