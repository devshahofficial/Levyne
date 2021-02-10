import { POST } from "../CustomFetch";

/**
 * @param {number} BucketID
 * @param {string} Token
 */
const CancelOrder = async (BucketID, Token) => {
    await POST("Orders/CancelOrder", {
        Token,
        Body: {
            BucketID
        },
        ThrowError: true
    })
}
export default CancelOrder;