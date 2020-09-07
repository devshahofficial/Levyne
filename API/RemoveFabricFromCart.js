import CustomRequest from './CustomRequest';

export default RemoveFabricFromCart = async (FabricID, Token) => {
    await CustomRequest(`Fabrics/RemoveFromCartByFabricID`, 'POST', false, Token, {FabricID});
}