import CustomRequest from './CustomRequest';
import AsyncStorage from '@react-native-community/async-storage'
export default generateOTP = async (Mobile) => {
    if(Mobile.length != 10)
    {
        throw new Error('Not a valid Mobile number');
    }
    else
    {
        return await CustomRequest('generateOTP', 'POST', true, undefined, {Mobile});
    }
}

export const skipLogin = async () => {
    await AsyncStorage.setItem('SkipLogin', '1');
}