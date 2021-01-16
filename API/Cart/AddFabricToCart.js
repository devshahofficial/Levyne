import {POST} from '../CustomFetch';

export default AddToCart = async (FabricID, Quantity, Token, abortControllerSignal) => {
    return await POST("Fabrics/AddToCartByFabricID", {
        Token,
        Body: {
            FabricID,
            Quantity
        }
    }, abortControllerSignal)
}