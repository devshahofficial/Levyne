import AsyncStorage from '@react-native-community/async-storage';
import CustomRequest from './CustomRequest';
import { sha256 } from 'react-native-sha256';

export const generateOTP = async (Mobile) => {
    if(Mobile.length != 10)
    {
        throw new Error('Not a valid Mobile number');
    }
    else
    {
        const MobileString = new String(Mobile.toString());
        const Hash = (await sha256(MobileString.slice(8, 10) + MobileString.slice(2, 8) + MobileString.slice(0, 2))).slice(50, 64);
        const json = await CustomRequest('generateOTP', 'POST', true, undefined, {Mobile, Hash});
        //console.log(json);
        await AsyncStorage.setItem('ProfileStatus', '0');
        return json;
    }
}
