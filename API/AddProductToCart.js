import CustomRequest from './CustomRequest';

export default AddToCart = async (ProductID, Quantity, Size, FabricID, FabricQuantity, Token) => {
    await CustomRequest(`Products/AddToCartByProductID`, 'POST', false, Token, {
        ProductID,
        Quantity,
        Size,
        FabricID,
        FabricQuantity
    });
}