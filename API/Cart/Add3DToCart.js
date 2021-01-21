import {POST} from '../CustomFetch';

export default AddToCart = async (ModelID, FabricID, Token, abortControllerSignal) => {

   return await POST("CartV2/AddToCart", {
        Token,
        Body: {
            Type: 2,
            ModelID,
            FabricID,
        },
        ThrowError: true,
    }, abortControllerSignal)
}