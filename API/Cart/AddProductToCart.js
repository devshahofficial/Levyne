import {POST} from '../CustomFetch';

export default AddToCart = async (ProductID, FabricID, Token, abortControllerSignal) => {

    return await POST("Cart/AddToCartByProductID", {
        Token,
        Body: {
            ProductID,
            FabricID,
        }
    }, abortControllerSignal)
}