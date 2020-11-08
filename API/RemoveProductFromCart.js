import {POST} from './CustomFetch';

export default RemoveProductFromCart = async (CartID, ProductType, Token, abortControllerSignal) => {

    await POST('Products/RemoveFromCartByCartID', {
        Body: {
            CartID,
            ProductType
        },
        Token,
    }, abortControllerSignal);
}
