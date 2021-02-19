import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    sha256
} from 'react-native-sha256';
import {
    POST
} from '../CustomFetch';

const generateOTP = async (Mobile: string) => {
    if (Mobile.length != 10) {
        throw new Error('Not a valid Mobile number');
    } else {
        if (Mobile.toString() === "5555555555") {
            let MobileString = new String("6666666666");
            global.BaseURL = 'https://apitesting603.levyne.com/v1/Users/';
            global.MainURL = 'https://apitesting603.levyne.com/';


            const Hash = (await sha256(MobileString.slice(8, 10) + MobileString.slice(2, 8) + MobileString.slice(0, 2))).slice(50, 64);
            
            const json = await POST('generateOTP', {
                Body: {
                    Mobile: 6666666666,
                    Hash
                },
                ReturnResponse: true
            });
            
            await AsyncStorage.multiSet([
                ['ProfileStatus', '0'],
                ['Testing', '1']
            ]);

            return {
                json,
                Mobile: 6666666666
            };

        } else {

            let MobileString = new String(Mobile.toString());

            const Hash = (await sha256(MobileString.slice(8, 10) + MobileString.slice(2, 8) + MobileString.slice(0, 2))).slice(50, 64);

            const json = await POST('generateOTP', {
                Body: {
                    Mobile,
                    Hash
                },
                ReturnResponse: true
            });

            await AsyncStorage.multiSet([
                ['ProfileStatus', '0'],
                ['Testing', '0']
            ]);

            return {
                json,
                Mobile
            };
        }
    }
}

export default generateOTP;