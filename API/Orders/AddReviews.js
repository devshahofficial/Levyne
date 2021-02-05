import { POST } from "../CustomFetch";

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