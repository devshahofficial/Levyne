import { POST } from "../CustomFetch";

const HandlePaymentResponse = async (order_id, razorpay_payment_id, razorpay_order_id, razorpay_signature, abortControllerSignal) => {
    return await POST("Orders/HandlePaymentResponse", {
        ReturnResponse: true,
        ThrowError: true,
        Body: { order_id, razorpay_payment_id, razorpay_order_id, razorpay_signature }
    }, abortControllerSignal)
}
export default HandlePaymentResponse;