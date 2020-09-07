import CustomRequest from './CustomRequest';

export default RemoveProductFromCart = async (CartID, ProductType, Token) => {
    await CustomRequest(`Products/RemoveFromCartByCartID`, 'POST', false, Token, {CartID, ProductType});
}