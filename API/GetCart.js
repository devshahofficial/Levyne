import CustomRequest from './CustomRequest';
export default GetCart = async (Token) => {
    return await CustomRequest(`Users/Products/getCart`, 'GET', true, Token);
}