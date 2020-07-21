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

export const AuthCheck = async (setAccess_token, setRefresh_token, setTimestamp, setName, setEmail, setAbout, setAddress, setProfileImage, setBrandID, setMobile) => {
    try {
        const Response = await AsyncStorage.multiGet(['access_token', 'refresh_token', 'timestamp', 'BrandID', 'Mobile', 'ProfileStatus']);
        if(!(Response[0][1] && Response[1][1] && Response[2][1] && Response[3][1]))
            throw new Error('Async storage error');

        let access_token = Response[0][1];
        
        setAccess_token(Response[0][1]);
        setRefresh_token(Response[1][1]);
        setTimestamp(Response[2][1]);
        setBrandID(Response[3][1]);
        setMobile(Response[4][1]);

        const BrandID = Response[3][1];

        const ProfileStatus = Response[5][1];
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setHours(yesterday.getHours() - 20);
        const Timestamp = new Date(Response[2][1].replace(' ', 'T'));

        if(Timestamp < yesterday)
        {
            const RefreshTokenJSON = await CustomRequest('refreshtoken', 'POST', true, undefined, {BrandID, refreshToken: Response[1][1], UID: config.DeviceID});
            
            await AsyncStorage.multiSet([
                ['access_token', RefreshTokenJSON.access_token],
                ['refresh_token', RefreshTokenJSON.refresh_token],
                ['timestamp', RefreshTokenJSON.timestamp]
            ])
            access_token = RefreshTokenJSON.access_token;
            setAccess_token(RefreshTokenJSON.access_token);
            setRefresh_token(RefreshTokenJSON.refresh_token);
            setTimestamp(RefreshTokenJSON.timestamp);
        }

        /**
         * Cases 
         *  1 : Login Done but Profile Incomplete
         *  2 : Profile Done but Documenets not submitted
         *  3 : Documents uploaded but in pending state
         *  4 : Verification already done
         * 
         */

        switch(parseInt(ProfileStatus)) {
            case 1 :
                return 'EditProfileAuth';
            case 2 :
                return 'DocumentUpload';
            case 3 :
                const JSONResp3 = await CustomRequest('Profile/ProfileStatus', 'GET', true, access_token);
                switch(JSONResp3.ProfileStatus) {
                    case 1 :
                        await AsyncStorage.setItem("ProfileStatus", "1");
                        return 'EditProfileAuth';
                    case 2 :
                        await AsyncStorage.setItem("ProfileStatus", "2");
                        return 'DocumentUpload';
                    case 3 :
                        return 'Pending'
                    case 4 :
                        await AsyncStorage.multiSet([
                            ['Name', JSONResp3.Name],
                            ['Email', JSONResp3.Email],
                            ['ProfileImage', JSONResp3.ProfileImage],
                            ['About', JSONResp3.About],
                            ['Address', JSONResp3.Address + '\n' + JSONResp3.City + '-' + JSONResp3.PinCode],
                            ['ProfileStatus', '4']
                        ]);
                        setName(JSONResp3.Name);
                        setEmail(JSONResp3.Email);
                        setProfileImage(JSONResp3.ProfileImage);
                        setAbout(JSONResp3.About);
                        setAddress(JSONResp3.Address + '\n' + JSONResp3.City + '-' + JSONResp3.PinCode);
                        return 'AppTour';
                }
            case 4 :
                const Response4 = await AsyncStorage.multiGet(['Name', 'Email', 'ProfileImage', "About", "Address", 'AppTour']); 
                setName(Response4[0][1]);
                setEmail(Response4[1][1]);
                setProfileImage(Response4[2][1]);
                setAbout(Response4[3][1]);
                setAddress(Response4[4][1])
                if(Response4[5][1]) {
                    return 'MainHomeStack';
                } else {
                    return 'AppTour';
                }
        }
    }
    catch(err) {
        if(err.message != 'Async storage error') {
            console.log(err);
        }
        throw new Error('Login');
    }
}