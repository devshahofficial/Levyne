import {POST} from '../CustomFetch';

export default RemoveFabricFromCart = async (FabricID, Token, abortControllerSignal) => {

    await POST('Fabrics/RemoveFromCartByFabricID', {
        Body: {
            FabricID
        },
        Token,
        ReturnResponse: true
    }, abortControllerSignal);
}
