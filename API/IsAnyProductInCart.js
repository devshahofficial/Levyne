import {GET} from './CustomFetch';

const IsAnyProductInCart = async (Token) => {

    return await GET('Cart/IsAnyProductInCart', {
        ReturnResponse: true,
        Token
    })
    
}

export default IsAnyProductInCart;