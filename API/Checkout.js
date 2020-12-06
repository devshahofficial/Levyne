import { POST } from "./CustomFetch";

const Checkout = async (Address, PinCode, Comment, BucketID, Token, abortControllerSignal) => {
    return await POST("Orders/Checkout", {
        ReturnResponse: true,
        Token,
        Body: {
            Address,
            PinCode,
            Comment,
            BucketID
        }
    }, abortControllerSignal)
}
export default Checkout;