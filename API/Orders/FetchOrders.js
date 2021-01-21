import {GET} from '../CustomFetch';

const FetchOrders = async (Token, OrderID, Page, abortControllerSignal) => {

    return await GET('Orders/FetchOrders', {
        ReturnResponse: true,
        Token,
        QueryData: {Page, OrderID}
    }, abortControllerSignal)

}

export default FetchOrders; 