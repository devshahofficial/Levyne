import {POST} from './CustomFetch';

export default RemoveProductFromCart = async (BucketID, CartID, ProductType, Token, abortControllerSignal) => {

    await POST('Cart/RemoveFromCartByCartID', {
        Body: {
            BucketID,
            CartID,
            ProductType
        },
        Token,
    }, abortControllerSignal);
}
