import {POST} from '../CustomFetch';

export default AddToCart = async (ModelID, FabricID, Token, abortControllerSignal) => {

   return await POST("Cart/AddToCart3D", {
        Token,
        Body: {
            ModelID,
            FabricID,
        },
        ThrowError: true,
    }, abortControllerSignal)
}