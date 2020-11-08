import {GET} from './CustomFetch';

const FetchOrderDetails = async (OrderID, Token, abortControllerSignal) => {

    return await GET('Orders/FetchOrderByOrderID', {
        ReturnResponse: true,
        Token,
        QueryData: {OrderID}
    }, abortControllerSignal)

}

export default FetchOrderDetails; 