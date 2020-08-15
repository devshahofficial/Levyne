import AsyncStorage from '@react-native-community/async-storage';
//import NewSocket from '../API/NewSocket';
import CustomRequest from './CustomRequest';
/**
 *  Error codes
 *  1) 0 -> OTP length less then 6 or greater then 6, Human Error
 *  2) 1 -> Netowork Error
 *  3) 2 -> SHA Library Error
 *  4) 3 -> AsyncStorage Error
 */
const verifyOTP = async (Mobile, OTP, OTPTokenHash, UID, setAuth, setProfile) => {
    if(OTP.length != 6)
    {
        throw new Error('Not a valid OTP');
    }
    else
    {
        const json = await CustomRequest('verifyOTP', 'POST', true, undefined, {Mobile, OTP, OTPTokenHash, UID});
        switch(json.ProfileStatus) {
            case 1 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', json.Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['ProfileStatus', '1'],
                    ['UserID', json.UserID.toString()],
                    ['SkipLogin', '0']
                ]);

                setAuth({
                    AccessToken : json.AccessToken,
                    RefreshToken : json.RefreshToken,
                    Timestamp : json.Timestamp,
                    Mobile : Mobile,
                    UserID : json.UserID,
                    SkipLogin: false
                })
                return 'EditProfileAuth';
            case 2 :
                await AsyncStorage.multiSet([
                    ['AccessToken', json.AccessToken],
                    ['RefreshToken', json.RefreshToken],
                    ['Timestamp', json.Timestamp],
                    ['Mobile', Mobile.toString()],
                    ['Name', json.Name],
                    ['Email', json.Email],
                    ['ProfileImage', json.ProfileImage],
                    ['About', json.About],
                    ['Address', json.Address + '\n' + json.City + '-' + json.PinCode],
                    ['ProfileStatus', json.ProfileStatus.toString()],
                    ['UserID', json.UserID.toString()]
                ]);
                setAccessToken(json.AccessToken);
                setRefreshToken(json.RefreshToken);
                setTimestamp(json.Timestamp);
                setMobile(Mobile);
                setName(json.Name);
                setEmail(json.Email);
                setBrandID(json.BrandID);
                setProfileImage(json.ProfileImage);
                setAbout(json.About);
                setAddress(json.Address + '\n' + json.City + '-' + json.PinCode);
                //const Socket = await NewSocket(json.AccessToken);
                //setSocket(Socket);
                return returnValueArray[json.ProfileStatus - 1];
        }
    }
}

export default verifyOTP;