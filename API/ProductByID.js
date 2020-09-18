import CustomRequest from './CustomRequest';
const ProductByID = (ProductID, Token, abortControllerSignal) => {
    return new CustomRequest('Products/FetchByProductID?ProductID=' + ProductID, 'GET', true, Token, null, abortControllerSignal);
}

export default ProductByID;