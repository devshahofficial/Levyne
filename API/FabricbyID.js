import CustomRequest from './CustomRequest';
const FabricbyID = (FabricID, Token) => {
    return new CustomRequest('Fabrics/FetchByFabricID?FabricID=' + FabricID, 'GET', true, Token);
}

export default FabricbyID;