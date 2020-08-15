import AsyncStorage from '@react-native-community/async-storage';
import config from '../assets/constants';
import CustomRequest from './CustomRequest';

export const AuthCheck = async (setAuth, setProfile) => {
    try {
        const SkipLogin = await AsyncStorage.multiGet(['SkipLogin', 'ProfileStatus']);
        if(SkipLogin[0][1]) {
            setAuth({SkipLogin: true});
            if(SkipLogin[1][1]) {
                setProfile({ProfileStatus: parseInt(SkipLogin[1][1])});
            }
            return 'MainHomeStack'
        }

        const Response = await AsyncStorage.multiGet(['AccessToken', 'RefreshToken', 'Timestamp', 'UserID', 'Mobile']);
        if(!(Response[0][1] && Response[1][1] && Response[2][1] && Response[3][1]))
            throw new Error('Tokens not found');

        setAuth({
            AccessToken : Response[0][1],
            RefreshToken : Response[1][1],
            Timestamp : Response[2][1],
            Mobile : Response[4][1],
            UserID : Response[3][1]
        });

        const UserID = Response[3][1];

        const ProfileStatus = parseInt(SkipLogin[1][1]);

        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setHours(yesterday.getHours() - 20);
        const Timestamp = new Date(Response[2][1].replace(' ', 'T'));

        if(Timestamp < yesterday)
        {
            const RefreshTokenJSON = await CustomRequest('refreshtoken', 'POST', true, undefined, {UserID, refreshToken: Response[1][1], UID: config.DeviceID});
            
            await AsyncStorage.multiSet([
                ['AccessToken', RefreshTokenJSON.AccessToken],
                ['RefreshToken', RefreshTokenJSON.RefreshToken],
                ['Timestamp', RefreshTokenJSON.Timestamp]
            ])
            AccessToken = RefreshTokenJSON.AccessToken;

            setAuth({
                AccessToken : RefreshTokenJSON.AccessToken,
                RefreshToken : RefreshTokenJSON.RefreshToken,
                Timestamp : RefreshTokenJSON.Timestamp
            })
        }

        switch (ProfileStatus) {
            case 2:
                const ResponseCase2 = await AsyncStorage.multiGet([
                    'Name',
                    'Email',
                    'ProfileImage',
                    'Address'
                ]);
                setProfile({
                    Name : ResponseCase2[0][1],
                    Email : ResponseCase2[1][1],
                    ProfileImage : ResponseCase2[2][1],
                    Address : ResponseCase2[3][1],
                })
            case 1:
            default:
                return 'MainHomeStack'
        }

        
    }
    catch(err) {
        throw new Error('Login');
    }
}