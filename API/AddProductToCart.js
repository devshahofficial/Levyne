import CustomRequest from './CustomRequest';

export default AddToCart = async (ProductID, FabricID, Token, abortControllerSignal) => {
    await CustomRequest(`Products/AddToCartByProductID`, 'POST', false, Token, {
        ProductID,
        FabricID,
    }, abortControllerSignal);
}