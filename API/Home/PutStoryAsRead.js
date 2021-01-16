import { POST } from "../CustomFetch";

const PutStoryAsRead = async (ProductID, Token) => {
    return await POST("Profile/PutStoryAsRead", {
        Token,
        Body: {
            ProductID,
        }
    })
}
export default PutStoryAsRead;