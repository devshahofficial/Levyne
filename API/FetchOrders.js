import CustomRequest from './CustomRequest';

const FetchOrders = async (AfterOrderID, Token, abortControllerSignal) => {
    return await CustomRequest('Orders/FetchOrders?AfterOrderID=' + AfterOrderID, 'GET', true, Token, null, abortControllerSignal);
}

export default FetchOrders;
