import CustomRequest from './CustomRequest';
const ProductByID = (ProductID, Token) => {
    return new CustomRequest('Products/FetchByProductID?ProductID=' + ProductID, 'GET', true, Token);
}

export default ProductByID;