import CustomRequest from './CustomRequest';

export default RemoveFabricFromCart = async (FabricID, Token, abortControllerSignal) => {
    await CustomRequest(`Fabrics/RemoveFromCartByFabricID`, 'POST', false, Token, {FabricID}, abortControllerSignal);
}