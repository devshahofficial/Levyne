import CustomRequest from './CustomRequest';

export default RemoveProductFromCart = async (CartID, ProductType, Token, abortControllerSignal) => {
    await CustomRequest(`Products/RemoveFromCartByCartID`, 'POST', false, Token, {CartID, ProductType}, abortControllerSignal);
}