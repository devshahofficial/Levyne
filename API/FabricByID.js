import CustomRequest from './CustomRequest';
const FabricByID = (FabricID, Token, abortControllerSignal) => {
    return new CustomRequest('Fabrics/FetchByFabricID?FabricID=' + FabricID, 'GET', true, Token, null, abortControllerSignal);
}

export default FabricByID;