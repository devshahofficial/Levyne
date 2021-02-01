import { POST } from "../CustomFetch";

const Checkout = async (Address, PinCode, Comment, CouponCode, BucketID, Token, abortControllerSignal) => {
    return await POST("Orders/Checkout", {
        ReturnResponse: true,
        ThrowError: true,
        Token,
        Body: {
            Address,
            PinCode,
            Comment,
            BucketID,
            ...(CouponCode ? {CouponCode}: {})
        }
    }, abortControllerSignal)
}
export default Checkout;