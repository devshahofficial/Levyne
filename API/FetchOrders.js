import {GET} from './CustomFetch';

const FetchOrders = async (AfterOrderID, Token, abortControllerSignal) => {

    return await GET('Orders/FetchOrders', {
        ReturnResponse: true,
        Token,
        QueryData: {AfterOrderID}
    }, abortControllerSignal)

}

export default FetchOrders; 