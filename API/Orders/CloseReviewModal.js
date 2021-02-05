import { POST } from "../CustomFetch";

const CloseReviewModal = async (OrderID, Token) => {
    POST("Orders/CloseReviewModal", {
        Token,
        Body: {
            OrderID
        },
        ThrowError: true
    }).catch((err) => {console.log(err)});
}
export default CloseReviewModal;