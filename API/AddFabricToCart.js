import CustomRequest from './CustomRequest';

export default AddToCart = async (FabricID, Quantity, Token, abortControllerSignal) => {
    await CustomRequest(`Fabrics/AddToCartByFabricID`, 'POST', false, Token, {
        FabricID,
        Quantity
    }, abortControllerSignal);
}