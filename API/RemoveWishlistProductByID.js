import {POST} from './CustomFetch';
const RemoveWishlistProductByID = async (ProductID, Token) => {

    try {
        await POST('Products/RemoveFromWishList', {
            Token,
            Body: {ProductID}
        })
    } catch(err) {
        //console.log(err);
    }
}


export default RemoveWishlistProductByID;