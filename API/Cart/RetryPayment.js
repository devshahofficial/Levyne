import { POST } from "../CustomFetch";

const RetryPayment = async (BucketID, Token, abortControllerSignal) => {
    return await POST("Orders/RetryPayment", {
        ReturnResponse: true,
        ThrowError: true,
        Token,
        Body: { BucketID }
    }, abortControllerSignal)
}
export default RetryPayment;