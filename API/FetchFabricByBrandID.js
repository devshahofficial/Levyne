import CustomRequest from './CustomRequest';
//diff query  in docs
const FetchFabricByBrandID = async (BrandID, Page, Token) => {
    return await CustomRequest(`Fabrics/FetchByBrandID?BrandID=${BrandID}&Page=${Page}`, 'GET', true, Token);
}
export default FetchFabricByBrandID;
