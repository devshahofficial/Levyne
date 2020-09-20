import CustomRequest from './CustomRequest';

const Checkout = async (Address, PinCode, Comment, BrandID, Token, abortControllerSignal) => {
    return await CustomRequest(`Orders/Checkout`, 'POST', true, Token, {
        Address,
        PinCode,
        Comment,
        BrandID
    }, abortControllerSignal);
}


export default Checkout;