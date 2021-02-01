import { GET } from "../CustomFetch";

const ValidateCoupon = async (CouponCode, BucketID, Token, abortControllerSignal) => {
    return await GET("Orders/ValidateCouponCode", {
        ReturnResponse: true,
        ThrowError: true,
        Token,
        QueryData: { CouponCode, BucketID }
    }, abortControllerSignal)
}
export default ValidateCoupon;