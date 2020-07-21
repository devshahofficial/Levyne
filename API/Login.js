import CustomRequest from './CustomRequest';
export const generateOTP = async (Mobile) => {
    if(Mobile.length != 10)
    {
        throw new Error('Not a valid Mobile number');
    }
    else
    {
        return await CustomRequest('generateOTP', 'POST', true, undefined, {Mobile});
    }
}