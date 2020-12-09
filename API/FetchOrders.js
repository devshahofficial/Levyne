import {GET} from './CustomFetch';

const FetchOrders = async (Token, Page, abortControllerSignal) => {

    return await GET('Orders/FetchOrders', {
        ReturnResponse: true,
        Token,
        QueryData: {Page}
    }, abortControllerSignal)

}

export default FetchOrders; 