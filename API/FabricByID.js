import {GET} from './CustomFetch';

const FabricByID = async (FabricID, Token, abortControllerSignal) => {

    return await GET('Fabrics/FetchByFabricID', {
        ReturnResponse: true,
        Token,
        QueryData: {FabricID}
    }, abortControllerSignal)

}

export default FabricByID; 