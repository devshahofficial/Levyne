import CustomRequest from './CustomRequest';
export default getReviews = async (ProductID, Page, Token) => {
    return await CustomRequest(`Users/Products/getreviewsbyproductid?id=${ProductID}&start=${Page}`, 'GET', true, Token);
}