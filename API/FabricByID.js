import {GET} from './CustomFetch';

const FabricbyID = async (FabricID, Token, abortControllerSignal) => {

    return await GET('Fabrics/FetchByFabricID', {
        ReturnResponse: true,
        Token,
        QueryData: {FabricID}
    }, abortControllerSignal)

}

export default FabricbyID; 