import CustomRequest from './CustomRequest';
const FabricByID = (FabricID, Token) => {
    return new CustomRequest('Fabrics/FetchByFabricID?FabricID=' + FabricID, 'GET', true, Token);
}

export default FabricByID;