import {GET} from '../CustomFetch';

const FabricByID = async (FabricID, abortControllerSignal) => {

    return await GET('Fabrics/FetchByFabricID', {
        ReturnResponse: true,
        QueryData: {FabricID}
    }, abortControllerSignal)

}

export default FabricByID; 