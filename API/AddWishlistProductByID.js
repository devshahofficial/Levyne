import { POST } from "./CustomFetch";

const AddWishlistProductByID = async (ProductID, Token, abortControllerSignal) => {
    return await POST("Products/AddToWishList", {
        Token,
        Body: {
            ProductID,
        }
    }, abortControllerSignal)
}
export default AddWishlistProductByID;