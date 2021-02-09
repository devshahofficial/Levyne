import { POST } from "../CustomFetch";

/**
 * @param {number} OrderID
 * @param {{ Brand: number; Levyne: number; }} Ratings
 * @param {{ Brand: string; }} Reviews
 * @param {string} Token
 */
const AddReviews = async (OrderID, Ratings, Reviews, Token) => {
    POST("Orders/ReviewOrder", {
        Token,
        Body: {
            OrderID,
            Ratings,
            Reviews
        },
        ThrowError: true
    }).catch((err) => {console.log(err)});
}
export default AddReviews;