import AsyncStorage from '@react-native-community/async-storage';
import config from '../assets/constants';
import NewSocket from './NewSocket';
import FetchChatBuckets from './FetchChatBuckets';
import { POST } from './CustomFetch';
import IsAnyProductInCart from './IsAnyProductInCart';

export const AuthCheck = async (setAuth, setProfile, setSocket, setChatList, MarkBucketAsUnRead, setIsAnyProductInCart) => {
    try {
        const SkipLogin = await AsyncStorage.multiGet(['SkipLogin', 'ProfileStatus', 'Testing']);
        if(SkipLogin[0][1] && parseInt(SkipLogin[0][1])) {
            setAuth({SkipLogin: true});
            if(SkipLogin[1][1]) {
                setProfile({ProfileStatus: parseInt(SkipLogin[1][1])});
            }
            return 'MainHomeStack'
        }

        if (+SkipLogin[2][1]) {
            global.BaseURL = 'https://apitesting603.levyne.com/v1/Users/';
            global.URL = 'https://apitesting603.levyne.com/';
        }

        const Response = await AsyncStorage.multiGet(['AccessToken', 'RefreshToken', 'Timestamp', 'UserID', 'Mobile']);
        if(!(Response[0][1] && Response[1][1] && Response[2][1] && Response[3][1]))
            throw new Error('Tokens not found');

        let AccessToken = Response[0][1];
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
            const RefreshTokenJSON = await POST('RefreshToken', {
                Body: {
                    UserID,
                    RefreshToken: Response[1][1],
                    UID: config.DeviceID
                },
                ReturnResponse: true
            });

            await AsyncStorage.multiSet([
                ['AccessToken', RefreshTokenJSON.AccessToken],
                ['RefreshToken', RefreshTokenJSON.RefreshToken],
                ['Timestamp', RefreshTokenJSON.Timestamp]
            ])

            AccessToken = RefreshTokenJSON.AccessToken;

            setAuth({
                AccessToken : RefreshTokenJSON.AccessToken,
                RefreshToken : RefreshTokenJSON.RefreshToken,
                Timestamp : RefreshTokenJSON.Timestamp,
                SkipLogin: false
            })
        }
        
        try {
            const Socket = await NewSocket(AccessToken);
            setSocket(Socket);
        } catch(err) {
            console.log('Socket Creation', err);
        }

        FetchChatBuckets(AccessToken, 1).then(rows => {
            setChatList(rows[0]);
            MarkBucketAsUnRead(rows[1]);
        }).catch(err => {
            console.log(err);
        })

        IsAnyProductInCart(AccessToken).then(resp => {
            setIsAnyProductInCart(resp.IsAnyProductInCart);
        })

        switch (ProfileStatus) {
            case 2:
                const ResponseCase2 = await AsyncStorage.multiGet([
                    'Name',
                    'Email',
                    'ProfileImage',
                    'Address',
                    'Gender',
                    'PinCode'
                ]);
                setProfile({
                    Name : ResponseCase2[0][1],
                    Email : ResponseCase2[1][1],
                    ProfileImage : ResponseCase2[2][1],
                    Address : ResponseCase2[3][1],
                    ProfileStatus: 2,
                    Gender: parseInt(ResponseCase2[4][1]),
                    PinCode: ResponseCase2[5][1]
                })
                return 'MainHomeStack';
            case 1:
                setProfile({
                    ProfileStatus: 1
                })
            default:
                return 'MainHomeStack';
        }
    }
    catch(err) {
        console.log(err);
        throw new Error('Login');
    }
}