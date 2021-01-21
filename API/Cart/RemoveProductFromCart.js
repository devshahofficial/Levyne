import {POST} from '../CustomFetch';

export default RemoveProductFromCart = async (CartID, Token, abortControllerSignal) => {

    await POST('CartV2/RemoveFromCartByCartID', {
        Body: {
            CartID
        },
        Token,
        ThrowError: true
    }, abortControllerSignal);
}
