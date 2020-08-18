import CustomRequest from './CustomRequest';
const RemoveWishlistFabricbyid = async (FabricID, Token) => {
    try {
        await CustomRequest(`Fabrics/RemoveFromWishList`, 'POST', false, Token, {FabricID});
    } catch(err) {
        console.log(err);
    }
    return;
}

export default RemoveWishlistFabricbyid;