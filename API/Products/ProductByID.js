import { GET } from '../CustomFetch';

const ProductbyID = (ProductID, Token, abortControllerSignal) => {
    return new GET('Products/FetchByProductID', {
        ReturnResponse: true,
        Token,
        QueryData: {
            ProductID
        }
    }, abortControllerSignal)
}

export default ProductbyID;