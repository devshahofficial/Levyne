import { POST } from "../CustomFetch";

const InsertFitsAndSizes = async (FitsAndSizes, Token, abortControllerSignal) => {
    return await POST("Profile/InsertFitsAndSizes", {
        Token,
        Body: {
            FitsAndSizes,
        }
    }, abortControllerSignal)
}
export default InsertFitsAndSizes;