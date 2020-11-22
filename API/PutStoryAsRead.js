import { POST } from "./CustomFetch";

const PutStoryAsRead = async (ProductID, Token) => {
    return await POST("Fabrics/AddToWishList", {
        Token,
        Body: {
            ProductID,
        }
    })
}
export default PutStoryAsRead;