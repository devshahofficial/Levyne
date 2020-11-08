import { POST } from "./CustomFetch";

const Checkout = async (Address, PinCode, Comment, BrandID, Token, abortControllerSignal) => {
    return await POST("Fabrics/AddToWishList", {
        ReturnResponse: true,
        Token,
        Body: {
            Address,
            PinCode,
            Comment,
            BrandID
        }
    }, abortControllerSignal)
}
export default Checkout;