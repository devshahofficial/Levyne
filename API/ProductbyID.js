import CustomRequest from './CustomRequest';
const ProductbyID = (ProductID, Token) => {
    return new CustomRequest('Products/FetchByProductID?ProductID=' + ProductID, 'GET', true, Token);
}

export default ProductbyID;