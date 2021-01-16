import { POST } from "../CustomFetch";

const AddWishlistFabricByID = async (FabricID, Token, abortControllerSignal) => {
    return await POST("Fabrics/AddToWishList", {
        Token,
        Body: {
            FabricID,
        }
    }, abortControllerSignal)
}
export default AddWishlistFabricByID;