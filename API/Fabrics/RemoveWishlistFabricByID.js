import {POST} from '../CustomFetch';
const RemoveWishlistFabricByID = async (FabricID, Token) => {
    try {
        await POST('Fabrics/RemoveFromWishList', {
            Token,
            Body: {FabricID}
        })
    } catch(err) {
        //console.log(err);
    }
    return;
}
export default RemoveWishlistFabricByID;