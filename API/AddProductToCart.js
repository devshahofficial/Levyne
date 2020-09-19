import CustomRequest from './CustomRequest';

export default AddToCart = async (ProductID, Quantity, Size, CustomerFabric, FabricID, FabricQuantity, Token, abortControllerSignal) => {
    await CustomRequest(`Products/AddToCartByProductID`, 'POST', false, Token, {
        ProductID,
        Quantity,
        Size,
        CustomerFabric,
        FabricID,
        FabricQuantity
    }, abortControllerSignal);
}