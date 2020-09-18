import CustomRequest from './CustomRequest';
const RemoveWishlistFabricbyid = async (FabricID, Token, abortControllerSignal) => {
    try {
        await CustomRequest(`Fabrics/RemoveFromWishList`, 'POST', false, Token, {FabricID}, abortControllerSignal);
    } catch(err) {
        console.log(err);
    }
    return;
}

export default RemoveWishlistFabricbyid;