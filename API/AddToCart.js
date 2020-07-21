import CustomRequest from './CustomRequest';

export default AddToCart = async (ProductID, QuantityChangeType, Token) => {
    await CustomRequest(`Users/Products/AddToCart`, 'POST', false, Token, {ProductID,QuantityChangeType});
    return;
}