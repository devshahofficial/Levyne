import AsyncStorage from '@react-native-community/async-storage';
import { POST } from './CustomFetch';
import { sha256 } from 'react-native-sha256';

export default generateOTP = async (Mobile) => {
    if(Mobile.length != 10)
    {
        throw new Error('Not a valid Mobile number');
    }
    else
    {
        const MobileString = new String(Mobile.toString());
        const Hash = (await sha256(MobileString.slice(8, 10) + MobileString.slice(2, 8) + MobileString.slice(0, 2))).slice(50, 64);
        const json = await POST('generateOTP', {
            Body: {
                Mobile,
                Hash
            },
            ReturnResponse: true
        });
        //console.log(json);
        await AsyncStorage.setItem('ProfileStatus', '0');
        return json;
    }
}
