import {POST} from '../CustomFetch';

export default AddToCart = async (ProductID, FabricID, Token, abortControllerSignal) => {

    return await POST("CartV2/AddToCart", {
        Token,
        Body: {
            ProductID,
            FabricID,
            Type: 1
        },
        ThrowError: true
    }, abortControllerSignal)
}