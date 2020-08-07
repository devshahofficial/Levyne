import AsyncStorage from '@react-native-community/async-storage';
import config from '../assets/constants';
import CustomRequest from './CustomRequest';
//import NewSocket from '../API/NewSocket';
//import GetChatList from '../API/GetChatlists';

/*const SocketHandler = (Socket, Token, setChatList, setIsAnyMsg) => {
    Socket.on("ChatMessage", (Message, CallBack) => {
        GetChatList(Token, 1).then(resp => {
            setChatList(resp);
            setIsAnyMsg(true);
        });
        CallBack(true);
    })
}
*/

export const AuthCheck = async (setAuth, setProfile) => {
    try {

        const SkipLogin = await AsyncStorage.getItem('SkipLogin');

        if(SkipLogin) {
            setAuth({SkipLogin: true});
            return 'MainHomeStack'
        }

        const Response = await AsyncStorage.multiGet(['access_token', 'refresh_token', 'timestamp', 'UserID', 'Mobile', 'ProfileStatus']);
        if(!(Response[0][1] && Response[1][1] && Response[2][1] && Response[3][1]))
            throw new Error('Tokens not found');

        let access_token = Response[0][1];
        
        setAuth({
            access_token : Response[0][1],
            refresh_token : Response[1][1],
            timestamp : Response[2][1],
            Mobile : Response[4][1],
            UserID : Response[3][1]
        });

        const UserID = Response[3][1];

        const ProfileStatus = parseInt(Response[5][1]);

        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setHours(yesterday.getHours() - 20);
        const Timestamp = new Date(Response[2][1].replace(' ', 'T'));

        if(Timestamp < yesterday)
        {
            const RefreshTokenJSON = await CustomRequest('refreshtoken', 'POST', true, undefined, {UserID, refreshToken: Response[1][1], UID: config.DeviceID});
            
            await AsyncStorage.multiSet([
                ['access_token', RefreshTokenJSON.access_token],
                ['refresh_token', RefreshTokenJSON.refresh_token],
                ['timestamp', RefreshTokenJSON.timestamp]
            ])
            access_token = RefreshTokenJSON.access_token;

            setAuth({
                access_token : RefreshTokenJSON.access_token,
                refresh_token : RefreshTokenJSON.refresh_token,
                timestamp : RefreshTokenJSON.timestamp
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