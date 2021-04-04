import { GET } from '../CustomFetch';

const ProductbyID = (ProductID, abortControllerSignal) => {
    return new GET('Products/FetchByProductID', {
        ReturnResponse: true,
        QueryData: {
            ProductID
        }
    }, abortControllerSignal)
}

export default ProductbyID;