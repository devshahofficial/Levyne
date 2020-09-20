import CustomRequest from './CustomRequest';

const FetchOrderDetails = async (OrderID, Token, abortControllerSignal) => {
    return await CustomRequest('Orders/FetchOrderByOrderID?OrderID=' + OrderID, 'GET', true, Token, null, abortControllerSignal);
}

export default FetchOrderDetails;
