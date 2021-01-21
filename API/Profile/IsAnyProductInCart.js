import {GET} from '../CustomFetch';

const IsAnyProductInCart = async (Token) => {

    return await GET('CartV2/IsAnyProductInCart', {
        ReturnResponse: true,
        Token
    })
    
}

export default IsAnyProductInCart;