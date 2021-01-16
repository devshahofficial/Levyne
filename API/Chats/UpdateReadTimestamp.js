import {POST} from '../CustomFetch';

const UpdateReadTimestamp = async (BucketID, Token) => {

    await POST('Chat/UpdateReadTimestamp', {
        Token,
        Body: {
            BucketID
        }
    })
}

export default UpdateReadTimestamp;