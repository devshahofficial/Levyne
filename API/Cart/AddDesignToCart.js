import {POST} from '../CustomFetch';

export default AddToCart = async (Body, Token, abortControllerSignal) => {

   return await POST("CartV2/AddToCart", {
        Token,
        Body,
        ThrowError: true,
    }, abortControllerSignal)
}