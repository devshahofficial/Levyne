import { POST } from "./CustomFetch";

const AddWishlistProductByID = async (ProductID, Token, abortControllerSignal) => {

    try {
        await POST("Products/AddToWishList", {
            Token,
            Body: {
                ProductID,
            }
        }, abortControllerSignal)
    } catch(err) {
        //console.log(err);
    }
}
export default AddWishlistProductByID;