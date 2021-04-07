import {POST} from '../CustomFetch';

export default AddToCart = async (ProductID, Size, Token, abortControllerSignal) => {

    return await POST("CartV2/AddToCart", {
        Token,
        Body: {
            ProductID,
            Size,
            Type: 1
        },
        ThrowError: true
    }, abortControllerSignal)
}