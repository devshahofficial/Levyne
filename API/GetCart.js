import CustomRequest from './CustomRequest';
export default GetCart = async (Token, abortControllerSignal) => {
    return await CustomRequest(`Users/Products/getCart`, 'GET', true, Token, null, abortControllerSignal);
}